from flask import Flask, Response, render_template, jsonify, request
import cv2
import mediapipe as mp
import math
import csv
import os
import numpy as np

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
visible_counter = 0
background_color = '#f58484'
all_visible_once_logged = False
CSV_FILE = 'landmark_distances.csv'

def calculate_distance(p1, p2):
    return math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)

def log_to_csv(data):
    with open(CSV_FILE, mode='a', newline='') as file:
        writer = csv.writer(file)
        if file.tell() == 0:  # Check if file is empty (header needs to be written)
            writer.writerow(['Shoulder', 'Waist', 'Torso Height', 'Leg Height', 'Thigh Radius'])
        writer.writerow(data)


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
        visible_counter += 1
        if visible_counter > 5:
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
            print("All landmarks are visible on the screen.")
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

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_background_color')
def get_background_color():
    return jsonify({"background_color": background_color})

@app.route('/process_frame', methods=['POST'])
def process_frame():
    try:
        if 'frame' not in request.files:
            return jsonify({"success": False, "error": "No frame provided"}), 400
        
        frame_file = request.files['frame']
        image_bytes = frame_file.read()
        
        # Process image and check landmarks
        process_image_from_bytes(image_bytes)
        
        return jsonify({"success": True, "background_color": background_color, "message": "Frame processed successfully"})
    
    except Exception as e:
        print(f"Error processing frame: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, threaded=True)

