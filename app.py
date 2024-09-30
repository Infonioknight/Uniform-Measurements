from flask import Flask, Response, render_template, jsonify, request, session
import cv2
import mediapipe as mp
import math
import os
import numpy as np
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import time

app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app)

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name('uniform-measurement-f711ead2e72b.json', scope)
client = gspread.authorize(creds)
sheet = client.open("Uniform test").sheet1 

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

LANDMARKS_TO_TRACK = {
    'Right Shoulder': 11,
    'Left Shoulder': 12,
    'Right Hip': 23,
    'Left Hip': 24,
    'Right Knee': 25,
    'Left Knee': 26,
    'Right Foot': 27,
    'Left Foot': 28,
    'Right Elbow': 13,
    'Left Elbow': 14
}

LANDMARKS_TO_CALIBRATE = {
    'Right Shoulder': 11,
    'Left Shoulder': 12,
}

VISIBILITY_THRESHOLD = 0.9
visible_counter = 0
background_color = '#f58484'
all_visible_once_logged = False

def calculate_distance(p1, p2):
    return math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)

def log_to_google_sheets(data):
    try:
        sheet_values = sheet.get_all_values()

        if len(sheet_values) == 0: 
            sheet.append_row(["Measurements in Inches (in)"])
            sheet.append_row(["Shoulder circumference", "Waist", "Torso height", "Leg height", "Thigh radius"])

        sheet.append_row(data)

    except Exception as e:
        print(f"Error logging data to Google Sheet: {e}")

def check_landmarks_visibility(landmarks, mode):
    global all_visible_once_logged, background_color, visible_counter
   
    all_visible = True
    
    session['landmark_coords'] = {}
    for part, index in LANDMARKS_TO_TRACK.items():
        landmark = landmarks[index]
        visibility = landmark.visibility

        if visibility < VISIBILITY_THRESHOLD:
            all_visible = False
    
        x = int(landmark.x * 640)
        y = int(landmark.y * 480)
        session['landmark_coords'][part] = (x, y)

    if all_visible:
        if visible_counter < 10:
            visible_counter += 1
        
        if visible_counter == 10:
            if mode == 1:  
                if not all_visible_once_logged:
                    session['shoulder_distance'] = round((calculate_distance(session['landmark_coords']['Right Shoulder'], session['landmark_coords']['Left Shoulder']) * 1.33) * session['scaling_factor'], 2)
                    session['hip_distance'] = round((calculate_distance(session['landmark_coords']['Right Hip'], session['landmark_coords']['Left Hip']) * 3.7) * session['scaling_factor'], 2) 
                    session['torso_height'] = round((calculate_distance(session['landmark_coords']['Right Shoulder'], session['landmark_coords']['Right Hip']) * 0.95) * session['scaling_factor'], 2) 
                    session['leg_height'] = round((calculate_distance(session['landmark_coords']['Right Hip'], session['landmark_coords']['Right Foot']) * 1.2) * session['scaling_factor'], 2) 
                    session['thigh_radius'] = round((calculate_distance(session['landmark_coords']['Right Hip'], session['landmark_coords']['Left Hip']) * 2) * session['scaling_factor'], 2)
            
                    all_visible_once_logged = True 
                    # log_to_google_sheets([shoulder_distance, hip_distance, torso_height, leg_height, thigh_radius])
                background_color = '#00ff00'
            
            elif mode == 0:
                if not all_visible_once_logged:
                    session['calibration_measurement'] = calculate_distance(session['landmark_coords']['Right Shoulder'], session['landmark_coords']['Left Shoulder'])
                    session['scaling_factor'] = (session['shoulder_width'] / session['calibration_measurement']) * 0.75
                    print(session['scaling_factor'])

                    all_visible_once_logged = True
                background_color = '#00ff00'
    else:
        visible_counter = 0
        background_color = '#f58484'
        all_visible_once_logged = False

    return all_visible

def process_image_from_bytes(image_bytes, mode):
    np_img = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb_img)
    if results.pose_landmarks:
        check_landmarks_visibility(results.pose_landmarks.landmark, mode)
    return results

def reset_variables():
    global background_color, visible_counter, all_visible_once_logged

    background_color = '#f58484'
    visible_counter = 0 
    all_visible_once_logged = False  

@app.route('/') # Display route
def landing():
    return render_template('landing.html')

@app.route('/previous_calibration') # Display route
def previous_calibration():
    return render_template('previous_calibration.html')

@app.route('/submit_measurements', methods=['POST']) # Shoulder measurement submission
def submit_measurements():
    try:
        shoulder_width = request.form.get('shoulder_width')  
        if shoulder_width:
            session['shoulder_width'] = float(shoulder_width )
            return jsonify({"success": True, "message": "Measurement stored successfully!"})
        else:
            return jsonify({"success": False, "error": "No measurement provided"}), 400
            
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/calibration_feed') # Display route
def calibration():
    return render_template('calibrationPage.html')

@app.route('/calibration_page', methods=['POST']) # Processing the calibration feed
def calculation():
    try:
        if 'frame' not in request.files:
            return jsonify({"success": False, "error": "No frame provided"}), 400
        
        frame_file = request.files['frame']
        image_bytes = frame_file.read()
        
        process_image_from_bytes(image_bytes, 0)

        return jsonify({"success": True, "background_color": background_color, "message": "Frame processed successfully"})
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/re_calibrate', methods=['POST']) # Re-calibration reset
def re_calibrate():
    global background_color, visible_counter, all_visible_once_logged, scaling_factor, calibration_measurement

    reset_variables()
    session['calibration_measurement'] = 0
    session['scaling_factor'] = 0

    return jsonify({"success": True, "message": "Calibration reset and background color updated"}), 200

@app.route('/get_circle_coords', methods=['POST']) # To retrieve the circles for highlighting part positions
def get_circle_coords():
    circle_coords = {
        'right_shoulder': session['landmark_coords']['Right Shoulder'],
        'left_shoulder': session['landmark_coords']['Left Shoulder'],
        'right_foot': session['landmark_coords']['Right Foot'],
        'left_foot': session['landmark_coords']['Left Foot'],
    }

    return jsonify({"success": True, "coordinates": circle_coords}), 200

@app.route('/video_feed') # Display route
def index():
    reset_variables()
    return render_template('index.html')

@app.route('/process_frame', methods=['POST']) # Regular feed processing
def process_frame():
    try:
        if 'frame' not in request.files:
            return jsonify({"success": False, "error": "No frame provided"}), 400
        
        frame_file = request.files['frame']
        image_bytes = frame_file.read()
        
        process_image_from_bytes(image_bytes, 1)
        
        return jsonify({"success": True, "background_color": background_color, "message": "Frame processed successfully"})
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/entry_submission')
def entry_submission_page():
    return render_template('submissionPage.html')

@app.route('/reading_submission', methods=['POST'])
def reading_submission():
    data = request.json
    user_id = data.get('id')

    log_to_google_sheets([user_id, session['shoulder_distance'], session['hip_distance'], session['torso_height'], session['leg_height'], session['thigh_radius']])
    return jsonify({"success": True}), 200

if __name__ == '__main__':
    app.run(debug=True, threaded=True)