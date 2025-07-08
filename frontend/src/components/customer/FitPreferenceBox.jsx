import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { baseUrl } from "../../baseUrl/BaseUrl";
import axios from "axios";
import Loader from "./Loader";

function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex self-center max-w-full text-xs text-center leading-7 w-[345px]">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map(
        (step, index) => (
          <React.Fragment key={step}>
            <div
              className={`px-3 ${
                currentStep === step ? "text-white bg-crimson" : "bg-white"
              } rounded-full border text-center text-lg border-black h-[30px] w-[30px]`}
              role="button"
              tabIndex={0}
              aria-label={`Step ${step} ${
                currentStep === step ? "(current)" : ""
              }`}
            >
              {step}
            </div>
            {index < totalSteps - 1 && (
              <div className="shrink-0 my-auto h-px border border-black w-[75px]" />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
}

function MeasurementInput({ label, value, setValue }) {
  const units = {
    Height: "CM",
    Weight: "Kgs",
  };

  return (
    <div className="flex items-center gap-5 mt-2">
      <label htmlFor={`${label.toLowerCase()}Input`} className="w-16 text-right">
        {label}
      </label>
      <input
        type="number"
        id={`${label.toLowerCase()}Input`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-20 h-[30px] text-center bg-white border border-black rounded-md"
        aria-label={`Enter your ${label.toLowerCase()}`}
      />
      {units[label] && (
        <div className="w-12 text-left">
          {units[label]}
        </div>
      )}
    </div>
  );
}

export default function FitPreferenceBox({setSizePredict,isOpen,setIsOpen,wearType,gender}) {
  const [currentStep, setCurrentStep] = useState(1); // Tracks the current step
  const [selectedValue, setSelectedValue] = useState(1); // Default to "Fit"
  const [height, setLocalHeight] = useState("");
  const [weight, setLocalWeight] = useState("");
  const [error, setError] = useState("");
  const [loding,setLoading] = useState(false)
  const [responseError, setResponseError] = useState("");

  const handleNext = () => {
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }
    setError("");
    setCurrentStep(2);
  };

  const predictSize = async () => {
    try {
      setResponseError("")
      setLoading(true)
      const res = await axios.post(
        `${baseUrl}/sizePredictor`,{ weight:weight, height:height,fitPreference:selectedValue,wearType:wearType,gender:gender},
        { withCredentials: true }
      );
      setSizePredict(res.data.predictedSize)
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      setResponseError("Invalid Height and Weight")
    }
    setLoading(false)
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-10"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />

      {/* Dialog Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-[30px] shadow-lg max-w-[550px] w-full p-8">
          <Dialog.Title className="text-2xl font-bold">
            Find my perfect fit
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-base leading-loose">
            {currentStep === 2 ? (
              <>
                <p className="text-sm font-medium text-gray-700">
                  Choose how you like your clothes to fit
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Drag the slider to select your preference.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700">
                  Discover your perfect size!
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Share your height and weight—your details are private.
                </p>
              </>
            )}
          </Dialog.Description>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={2} />

          {/* Step 1: Height and Weight Input */}
          {currentStep === 1 && (
            <div className="mt-2">
              <MeasurementInput
                label="Height"
                value={height}
                setValue={setLocalHeight}
              />
              <MeasurementInput
                label="Weight"
                value={weight}
                setValue={setLocalWeight}
              />
              {error && <p className="text-red mt-2 text-lg">{error}</p>}
            </div>
          )}

          {/* Step 2: Fit Preference */}
          {currentStep === 2 && (
            <div className="mt-12 text-center">
              <div className="mt-10 flex justify-center items-center bg-slate-700 rounded-md p-[2px]">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="1"
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(parseInt(e.target.value))}
                  className="w-full appearance-none h-2 bg-gray-300 rounded-full outline-2 transition focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-between mt-4 text-black font-medium">
                <span
                  className={`text-lg ${
                    selectedValue === 0
                      ? "text-crimson font-bold"
                      : "text-black"
                  }`}
                >
                  Tight
                </span>
                <span
                  className={`text-lg ${
                    selectedValue === 1
                      ? "text-crimson font-bold"
                      : "text-black"
                  }`}
                >
                  Fit
                </span>
                <span
                  className={`text-lg ${
                    selectedValue === 2
                      ? "text-crimson font-bold"
                      : "text-black"
                  }`}
                >
                  Loose
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
            {currentStep === 1 && (
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow-md hover:bg-gray-300 transition"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            )}
            {currentStep === 1 && (
              <button
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {currentStep === 2 && (
              <button
                className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg shadow-md hover:bg-gray-300 transition"
                onClick={() => setCurrentStep(1)}
              >
                Previous
              </button>
            )}
            {currentStep === 2 && (
              <>
                {loding ? (
                  <div className="mr-4">
                  <Loader />
                  </div>
                ) : (
                  <button
                    className="px-4 py-2 bg-crimson text-white font-medium rounded-lg shadow-md hover:bg-crimson-700 transition"
                    onClick={predictSize}
                  >
                    Finish
                  </button>
                )}
              </>
            )}
          </div>
          <div className="mt-2 text-red">
          {responseError}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
