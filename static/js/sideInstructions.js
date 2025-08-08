const backendURL = 'https://uniform-884275368968.asia-southeast1.run.app'
// const backendURL = 'http://127.0.0.1:5000';

document.getElementById('confirm-button').addEventListener('click', () => {
   window.location.href = `${backendURL}/video_feed`;
});
