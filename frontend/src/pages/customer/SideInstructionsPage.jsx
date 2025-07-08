import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideInstructionsPage = () => {
  const navigate = useNavigate();
      const { userId } = useParams();

  const handleConfirm = () => {
    const path = `/users/video-feed/${userId}`;
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Capture Your Side Profile</h1>
        <p className="text-gray-700">Please ensure the following:</p>
        <ul className="text-left text-gray-600 my-4 list-disc list-inside">
          <li>Your <strong>entire body</strong> is visible from <strong>head to toe</strong>.</li>
          <li>The camera captures your <strong>side view</strong> clearly.</li>
          <li>Stand upright with your <strong>arms relaxed</strong> at your sides.</li>
        </ul>
        <button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          OK, I'm Ready
        </button>
      </div>
    </div>
  );
};

export default SideInstructionsPage;
