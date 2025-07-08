/* eslint-disable react/prop-types */
import { useState } from "react";

const WorkerDetails = ({ details: initialDetails= [], onWorkerDetailsChange }) => {
  const [details, setDetails] = useState(
    initialDetails >0
      ? initialDetails.map((detail) => ({ ...detail }))
      : [
          {
            id: 1,
            name: "",
            email: "",
          },
        ]
  );

  const handleWorkerChange = (e, field, id) => {
    const updatedDetails = details.map((worker) =>
      worker.id === id ? { ...worker, [field]: e.target.value } : worker
    );
    setDetails(updatedDetails);
    onWorkerDetailsChange(updatedDetails);  // Call onChange when details change
  };

  const addMoreWorker = () => {
    const newWorker = {
      id: details.length + 1,
      name: "",
      email: "",
    };
    const newDetails = [...details, newWorker];
    setDetails(newDetails);
    onWorkerDetailsChange(newDetails); // Pass updated details to parent
  };

  return (
    <div className="md:flex flex-col justify-center gap-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            addMoreWorker();
          }}
          className="flex items-center justify-center text-sm border border-solid p-1 "
        >
          Add +
        </button>
      </div>

      {details?.map((worker) => (
        <div key={worker.id}>
          <div className="lg:flex  gap-9 max-lg:space-y-2">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-full p-3 border-[#D3D3D3] border-2 rounded-md outline-none"
              name={`name-${worker.id}`}
              value={worker.name}
              onChange={(e) => handleWorkerChange(e, "name", worker.id)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full max-w-full p-3 border-[#D3D3D3] border-2 rounded-md outline-none"
              name={`email-${worker.id}`}
              value={worker.email}
              onChange={(e) => handleWorkerChange(e, "email", worker.id)}
              required
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkerDetails;
