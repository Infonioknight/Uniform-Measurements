// const backendURL = 'https://uniform-1060926045936.asia-southeast1.run.app'
const backendURL = 'http://127.0.0.1:5000'

document.getElementById('id-entry-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const userId = document.getElementById('user_id').value;

    fetch(`${backendURL}/reading_submission`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = `${backendURL}/`; 
        } else {
            alert('Failed to submit ID. Please try again.');
        }
    })
    .catch(err => {
        console.error('Error submitting ID:', err);
        alert('An error occurred while submitting your ID.');
    });
});
