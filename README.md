# Uniform Measurement App

## Overview:
The goal of this project is to streamline and automate the process of getting the measurements of a person for the purpose of tailoring uniforms.

#### The project consists of the following:
 - A user-friendly calibration process to ensure the model performs well irrespective of the camera used.
 - Clear markings for assistance with positioning for measurements and clear instructions to ensure consistent and accurate measurements.
 - A measurement interface which measures the following dimensions:
    - Shoulder width
    - Waist
    - Torso height
    - Leg length 
    - Thigh radius
 - Reading logging to Google Sheets with identification by ID (which might not function if run using the below instructions as you'd require an API key to do so)

 ## How to run:
 1. Clone the repository into your local environment by typing the below command in the terminal:
 ```
 git clone https://github.com/Infonioknight/Uniform-Measurements.git
 ```
 2. Now, to ensure you have all the necessary packages and libraries installed for running the app, run:
 ```
 pip install -r requirements.txt
 ```
 3. Now run the below command,
 ```
 python3 run app.py (for MacOS users)
 python run app.py (Windows users)
 ```
 This should open the application up in port 5000 of your localhost server.

 4. The instructions to use the application are given in user interface. The order of the process is:
    - Enter a reference measurement (shoulder width in this case) to use for calibration.
    - Stand in front of the camera, following the instructions on the screen to take a calibration snapshot to scale measurements.
    - Move onto the main feed which you use for measurements. The video response contains white markers indicating where to stand for the most accurate measurements (align yourself in such a way)

5. Recorded values can be viewed in the below Google sheet (as of now the values are directly stored, without ability to wipe the sheet or edit / modify values)
```
https://docs.google.com/spreadsheets/d/1xZC9tC8viKiAv43bMrFdbgiMpnMTI5UxuAWU6HaFg1I/edit?usp=sharing
```
<b>Note:</b> Currently, if the app is run this way, I don't think values will get recorded to the Google Sheet due to there being no API key. So to make it functional, you can incorporate one and use it! The sheet will have a few sample measurements for you to look at and get an idea.

Happy measuring!

---

#### Legacy deployed version of the project:
https://uniform-1060926045936.asia-southeast1.run.app

 - The above link only contains a simple measurement interface, with response when the measurement is taken. There is no calibration process, so the measurements can have significant errors based off the camera being used.
 - The above app works optimally when using the webcam of a MacBook Air M1.
 - The readings will also be stored on the same google sheets as above.

 <b>Note:</b> The above link will store values in a slightly different manner than if using the local project above. This is because a new ID parameter was incorporated, which changes the alignment of the Google Sheet. Values are recorded nonetheless.

 ### Potential Improvements:
  - While I tried my best to make the calibration as accurate as possible, there still will be some cases where outlier measurements are recorded. This needs to be polished.

  - A better way to mark where to stand in the measurement page (I am open to ideas to make this more user-friendly)

  - Making the instructions on all the pages clearer, more concise and informative.

  Have fun using the above project! Feel free to give any suggestions regarding the same!


