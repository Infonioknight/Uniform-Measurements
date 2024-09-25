from flask import Flask, Response, render_template, jsonify, request
import cv2
import mediapipe as mp
import math
import os
import numpy as np
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)
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

def check_landmarks_visibility(landmarks):
    global all_visible_once_logged, background_color, visible_counter
    
    visibility_data = {}
    all_visible = True
    
    landmark_coords = {}
    for part, index in LANDMARKS_TO_TRACK.items():
        landmark = landmarks[index]
        visibility = landmark.visibility

        if visibility < VISIBILITY_THRESHOLD:
            all_visible = False
        
        visibility_data[part] = visibility
        x = int(landmark.x * 640)
        y = int(landmark.y * 480)
        landmark_coords[part] = (x, y)

    if all_visible:
        if visible_counter < 5:
            visible_counter += 1
        
        if visible_counter == 5:  
            if not all_visible_once_logged:
                shoulder_distance = round((calculate_distance(landmark_coords['Right Shoulder'], landmark_coords['Left Shoulder']) * 1.54) * 0.123, 2)
                hip_distance = round((calculate_distance(landmark_coords['Right Hip'], landmark_coords['Left Hip']) * 5) * 0.123, 2)
                torso_height = round((calculate_distance(landmark_coords['Right Shoulder'], landmark_coords['Right Hip'])) * 0.123, 2)
                leg_height = round((calculate_distance(landmark_coords['Right Hip'], landmark_coords['Right Foot']) * 1.47) * 0.123, 2)
                thigh_radius = round((calculate_distance(landmark_coords['Right Hip'], landmark_coords['Left Hip']) * 2.5) * 0.123, 2)
                
                print(visible_counter)
                all_visible_once_logged = True 
                log_to_google_sheets([shoulder_distance, hip_distance, torso_height, leg_height, thigh_radius])
            background_color = '#00ff00'
    else:
        visible_counter = 0
        background_color = '#f58484'
        all_visible_once_logged = False

    return all_visible

def draw_landmarks(image):
    rgb_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb_img)
    
    if results.pose_landmarks:
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
    return image

def process_image_from_bytes(image_bytes):
    np_img = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb_img)
    if results.pose_landmarks:
        check_landmarks_visibility(results.pose_landmarks.landmark)
    return results

def generate_frames():
    global background_color

    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    if not cap.isOpened():
        print("Error: Camera not accessible.")
        return

    while True:
        success, frame = cap.read()
        if not success:
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_frame)

        if results.pose_landmarks:
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            check_landmarks_visibility(results.pose_landmarks.landmark)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_frame', methods=['POST'])
def process_frame():
    try:
        if 'frame' not in request.files:
            return jsonify({"success": False, "error": "No frame provided"}), 400
        
        frame_file = request.files['frame']
        image_bytes = frame_file.read()
        
        process_image_from_bytes(image_bytes)
        
        return jsonify({"success": True, "background_color": background_color, "message": "Frame processed successfully"})
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, threaded=True)