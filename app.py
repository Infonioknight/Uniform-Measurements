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
    
    landmark_coords = {}
    for part, index in LANDMARKS_TO_TRACK.items():
        landmark = landmarks[index]
        visibility = landmark.visibility

        if visibility < VISIBILITY_THRESHOLD:
            all_visible = False
    
        x = int(landmark.x * 640)
        y = int(landmark.y * 480)
        landmark_coords[part] = (x, y)

    if all_visible:
        if visible_counter < 10:
            visible_counter += 1
        
        if visible_counter == 10:
            if mode == 1:  
                if not all_visible_once_logged:
                    shoulder_distance = round((calculate_distance(landmark_coords['Right Shoulder'], landmark_coords['Left Shoulder']) * 1.54) * 0.123, 2)
                    hip_distance = round((calculate_distance(landmark_coords['Right Hip'], landmark_coords['Left Hip']) * 5) * 0.123, 2)
                    torso_height = round((calculate_distance(landmark_coords['Right Shoulder'], landmark_coords['Right Hip'])) * 0.123, 2)
                    leg_height = round((calculate_distance(landmark_coords['Right Hip'], landmark_coords['Right Foot']) * 1.47) * 0.123, 2)
                    thigh_radius = round((calculate_distance(landmark_coords['Right Hip'], landmark_coords['Left Hip']) * 2.5) * 0.123, 2)

                    all_visible_once_logged = True 
                    log_to_google_sheets([shoulder_distance, hip_distance, torso_height, leg_height, thigh_radius])
                background_color = '#00ff00'
            
            elif mode == 0:
                if not all_visible_once_logged:
                    shoulder_pixel = calculate_distance(landmark_coords['Right Shoulder'], landmark_coords['Left Shoulder'])
                    print(shoulder_pixel)

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

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/previous_calibration')
def previous_calibration():
    return render_template('previous_calibration.html')

@app.route('/submit_measurements', methods=['POST'])
def submit_measurements():
    try:
        shoulder_width = request.form.get('shoulder_width')  # Get shoulder width from the form
        if shoulder_width:
            session['shoulder_width'] = shoulder_width  # Store the measurement in the session
            print(f"Shoulder width submitted and stored in session: {session['shoulder_width']}")  # Print to console
            return jsonify({"success": True, "message": "Measurement stored successfully!"})
        else:
            return jsonify({"success": False, "error": "No measurement provided"}), 400
            
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/existing_value', methods=['POST'])
def existing_value():
    try:
        shoulder_width = request.form.get('shoulder_width') 
        if shoulder_width:
            session['shoulder_width'] = shoulder_width  
            print(f"Existing shoulder width retrieved and stored in session: {session['shoulder_width']}") 
            return jsonify({"success": True, "message": "Existing measurement stored successfully!"})
        else:
            return jsonify({"success": False, "error": "No existing measurement provided"}), 400
            
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/video_feed')
def index():
    return render_template('index.html')

@app.route('/calibration_feed')
def calibration():
    return render_template('calibrationPage.html')

@app.route('/calibration_page', methods=['POST'])
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

@app.route('/re_calibrate', methods=['POST'])
def re_calibrate():
    global background_color, visible_counter, all_visible_once_logged, pose

    background_color = '#f58484'
    visible_counter = 0 
    all_visible_once_logged = False  

    return jsonify({"success": True, "message": "Calibration reset and background color updated"}), 200


@app.route('/process_frame', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True, threaded=True)