import React, { useState } from 'react';

const backendURL = 'http://127.0.0.1:5000'; // or production URL

const SubmissionPage = () => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendURL}/reading_submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });

      if (res.ok) {
        window.location.href = `${backendURL}/`;
        
      } else {
        setError('Failed to submit ID. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting ID:', err);
      setError('An error occurred while submitting your ID.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Measurement successfully recorded!</h2>
        <p className="mb-6 text-gray-600">Please enter your <b>ID</b> below</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <label htmlFor="user_id" className="text-sm text-gray-700">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SubmissionPage;
