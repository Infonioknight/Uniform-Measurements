// const backendURL = 'https://uniform-1060926045936.asia-southeast1.run.app'
const backendURL = 'http://127.0.0.1:5000';

function showCorrection() {
    document.getElementById('correction-box').classList.remove('hidden');
}

function showContinue() {
    window.location.href = `/${backendURL}/side_instructions`;
}