from flask import Flask, Response, render_template, jsonify
import cv2
import mediapipe as mp
import math
import csv
import os

app = Flask(__name__)

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
background_color = '#f58484'  
all_visible_once_logged = False
CSV_FILE = 'landmark_distances.csv'

def calculate_distance(p1, p2):
    return math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)

def log_to_csv(data):
    file_exists = os.path.isfile(CSV_FILE)
    with open(CSV_FILE, mode='a', newline='') as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(['Shoulder', 'Waist', 'Torso Height', 'Leg Height', 'Thigh Radius'])
        writer.writerow(data)

def check_landmarks_visibility(landmarks):
    global all_visible_once_logged, background_color
    
    visibility_data = {}
    all_visible = True
    
    landmark_coords = {}
    for part, index in LANDMARKS_TO_TRACK.items():
        landmark = landmarks[index]
        visibility = landmark.visibility
        visibility_data[part] = visibility
        
        if visibility < VISIBILITY_THRESHOLD:
            all_visible = False
        
        x = int(landmark.x * 640)
        y = int(landmark.y * 480)
        landmark_coords[part] = (x, y)

    if all_visible:
        if not all_visible_once_logged:
            shoulder_distance = round((calculate_distance(landmark_coords['Right Shoulder'], landmark_coords['Left Shoulder']) * 1.54) * 0.123, 2)
            hip_distance = round((calculate_distance(landmark_coords['Right Hip'], landmark_coords['Left Hip']) * 5) * 0.123, 2)
            torso_height = round((calculate_distance(landmark_coords['Right Shoulder'], landmark_coords['Right Hip'])) * 0.123, 2)
            leg_height = round((calculate_distance(landmark_coords['Right Hip'], landmark_coords['Right Foot']) * 1.47) * 0.123, 2)
            thigh_radius = round((calculate_distance(landmark_coords['Right Hip'], landmark_coords['Left Hip']) * 2.5) * 0.123, 2)
            
            log_to_csv([shoulder_distance, hip_distance, torso_height, leg_height, thigh_radius])
            print("All parts are visible. Landmark distances logged to CSV.")
            all_visible_once_logged = True
        background_color = '#00ff00'
    else:
        background_color = '#f58484'
        all_visible_once_logged = False  

    return all_visible

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

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_background_color')
def get_background_color():
    return jsonify({"background_color": background_color})

if __name__ == '__main__':
    app.run(debug=True, threaded=True)