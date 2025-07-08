import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const backendURL = 'http://127.0.0.1:5000';

export default function VerifyHeight({ trueHeight }) {
  const [showCorrectionBox, setShowCorrectionBox] = useState(false);
  const [correctedHeight, setCorrectedHeight] = useState('');
   const { userId } = useParams();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/users/side-instructions/${userId}`);
  };

  const handleCorrectionSubmit = (e) => {
    e.preventDefault();
    // Send corrected height to backend (fetch/axios)
    fetch(`${backendURL}/submit_height`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ corrected_height: correctedHeight }),
    }).then(() => {
      navigate('/side_instructions');
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <p className="mb-2">
          The true height measured was <strong>{trueHeight} cm</strong>.
        </p>
        <p>Is this value correct?</p>
        <div className="mt-4">
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700"
          >
            YES, continue
          </button>
          <button
            onClick={() => setShowCorrectionBox(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            NO, change
          </button>
        </div>

        {showCorrectionBox && (
          <div className="mt-6">
            <form onSubmit={handleCorrectionSubmit}>
              <p className="mb-2">
                Ensure your height is correct. This will influence all future measurements.
              </p>
              <input
                type="number"
                name="corrected_height"
                step="0.1"
                min="50"
                max="250"
                required
                value={correctedHeight}
                onChange={(e) => setCorrectedHeight(e.target.value)}
                placeholder="Enter your height in cm"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
