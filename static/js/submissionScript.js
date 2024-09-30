document.getElementById('id-entry-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const userId = document.getElementById('user_id').value;

    // Send the ID to the backend
    fetch('/reading_submission', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId })
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the video feed page
            window.location.href = '/video_feed'; // Change this to your video feed route
        } else {
            alert('Failed to submit ID. Please try again.');
        }
    })
    .catch(err => {
        console.error('Error submitting ID:', err);
        alert('An error occurred while submitting your ID.');
    });
});
