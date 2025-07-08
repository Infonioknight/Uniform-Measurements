// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// const LandingPage = () => {
//       const { userId } = useParams();

//     const navigate = useNavigate();

// const path = `/users/calibration/${userId}`;


//   return (
//       <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4">Before We Start</h1>
//         <p className="text-gray-600 mb-4">Please ensure the following:</p>
//         <ul className="text-left text-gray-700 mb-6 list-disc list-inside">
//           <li>Your <strong>entire body</strong> is visible in the camera frame.</li>
//           <li>This includes your <strong>head, shoulders, hands, and ankles</strong>.</li>
//           <li>Hold a <strong>credit card-sized card</strong> against your chest using the <strong>shorter edges</strong>.</li>
//         </ul>
//         <button
//           onClick={() => navigate(path)}
//           className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg transition duration-300"
//         >
//           OK, I'm Ready
//         </button>
//       </div>
//   );
// };

// export default LandingPage;
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LandingPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleReadyClick = () => {
    navigate(`/users/calibration/${userId}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center relative">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Before We Start</h1>
      <p className="text-gray-600 mb-4">Please ensure the following:</p>
      <ul className="text-left text-gray-700 mb-6 list-disc list-inside">
        <li>Your <strong>entire body</strong> is visible in the camera frame.</li>
        <li>This includes your <strong>head, shoulders, hands, and ankles</strong>.</li>
        <li>Hold a <strong>credit card-sized card</strong> against your chest using the <strong>shorter edges</strong>.</li>
      </ul>
      <button
        onClick={handleReadyClick}
        className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg transition duration-300"
      >
        OK, I'm Ready
      </button>
    </div>
  );
};

export default LandingPage;
