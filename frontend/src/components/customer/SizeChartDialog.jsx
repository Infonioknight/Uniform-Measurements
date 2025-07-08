import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../baseUrl/BaseUrl";

const SizeChartDialog = ({ isOpen, onClose, SellerId, Brand, Category }) => {
  const [sizechart, setSizechart] = useState([]);
  const [sizeHeader, setSizeHeader] = useState([]);

  useEffect(() => {
    const fetchSizechart = async () => {
      if (!SellerId || !Brand || !Category) return;

      try {
        const res = await axios.get(
          `${baseUrl}/user/brand/sizechart/${SellerId}/${Brand}/${Category}`,
          { withCredentials: true }
        );
        setSizechart(res.data.brandSizechart);
        // Determine headers based on category
        if (res.data.brandSizechart[0]?.wear === "Upper Bodywear") {
          setSizeHeader(["Chest", "Shoulder", "Length"]);
        } else if (res.data.brandSizechart[0]?.wear === "Lower Bodywear") {
          setSizeHeader(["Waist", "Inseam", "Outseam"]);
        }else if(res.brandSizechart[0]?.wear === "Full Bodywear"){
          setSizeHeader(["Chest", "Shoulder", "Waist", "Length"]);
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: "error",
        });
      }
    };

    fetchSizechart();
  }, [SellerId, Brand, Category]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
  {/* Overlay */}
  <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

  {/* Dialog Panel */}
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-lg p-6">
      {/* Dialog Header */}
      <DialogTitle className="text-xl font-bold text-gray-800 flex justify-between items-center border-b pb-3">
        <span>Size Chart</span>
        <button
          className="text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
          onClick={onClose}
        >
          ✕
        </button>
      </DialogTitle>

      {/* Dialog Content */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Size Chart for <span className="text-blue-600">{Brand}</span> -{" "}
          <span className="text-blue-600">{Category}</span>
        </h2>

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 bg-crimson p-3 rounded-md font-medium text-gray-900">
          <span>Size</span>
          {sizeHeader.map((header, index) => (
            <span key={index} className="text-center">
              {header} (in)
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-300 mt-2">
          {sizechart.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 py-2 items-center text-gray-800"
            >
              <span>{item.brandSize}</span>
              {sizeHeader.map((header, idx) => (
                <span key={idx} className="text-center">
                  {item[header.toLowerCase()] || "-"}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </DialogPanel>
  </div>
</Dialog>

  );
};

export default SizeChartDialog;
