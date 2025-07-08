import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import JumpButton from '../../components/jump/JumpButton';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function ContactUs() {
  const [contactData, setContactData] = useState('');
  const [formattedNumber, setFormattedNumber] = useState('');

  const formatPhoneNumber = (number) => {
    return number.slice(0, 3) + " " + number.slice(3);
  };

  useEffect(() => {
    if (contactData && contactData) {
      setFormattedNumber(formatPhoneNumber(contactData));
    }
  }, [contactData]);

  const officeLocation = [12.8836, 77.6939];

  return (
    <div className="font-sans ">
      <Navbar />
      <br /><br />
      <div className="flex flex-col w-full max-lg:h-80 bg-[#f8444f] max-md:px-5 max-md:max-w-full relative">
        <br />
        <div className="inset-0 self-center my-14 font-bold text-center text-neutral-300 text-opacity-25 max-md:mt-10 max-md:max-w-full font-[Montserrat] text-10xl sm:text-23xl lg:text-[70px]">
          Get in Touch with Zimutail
        </div>
      </div>

      <div className="bg-white max-md:mt-60 max-lg:mt-44">
        <div className="max-lg:absolute max-lg:top-36 max-md:p-8 max-md:top-48 max-lg:p-12 max-lg:z-10 max-lg:shadow-lg max-lg:shadow-[#F8444F]/40 bg-[#f9f9f9] text-xl leading-10 text-neutral-700 m-20 max-lg:m-20 max-md:m-4">
          We'd love to hear from you! Whether you have questions, feedback, or need assistance, our team is here to help. Reach out to us through any of the following methods.
        </div>
        <div className="grid max-lg:grid-rows-custom-rows max-lg:w-[350px] lg:mx-20 lg:grid-cols-custom-cols gap-4 mx-auto ">
          <div className="border border-solid border-rose-300 rounded-lg overflow-hidden">
            <MapContainer center={officeLocation} zoom={14} className="w-full h-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={officeLocation}>
                <Popup>
                  Our Office Location
                </Popup>
              </Marker>
            </MapContainer>

          </div>
          <div className="border border-solid border-rose-300 rounded-lg max-lg:col-start-1 max-lg:row-start-1">
            <p className="font-semibold text-5xl p-10 pb-0">Meet Us</p>
            <span className="block w-24 ml-10 h-px bg-rose-500" />
            <div className="p-10 pr-0 grid grid-rows-3 xl:grid-flow-col mt-5 text-lg">
              <div className="flex gap-4 whitespace-nowrap pb-8">
                <FaPhoneAlt />
                <div>{formattedNumber || "+910000000000"}</div>
              </div>
              <div className="flex gap-4 whitespace-nowrap">
                <FaMapMarkerAlt />
                <div>{contactData.email || "seller@gmail.com"}</div>
              </div>
              <div className="flex gap-4">
                <FaEnvelope />
                <div>{contactData.address || "29522 Market Square, Amytown"}</div>
              </div>
            </div>
          </div>
          <div className="border border-solid border-rose-300 rounded-lg">
            <p className="font-semibold text-5xl p-10 pb-0">Pitch Us</p>
            <span className="block w-24 ml-10 h-px bg-rose-500" />
            <p className="px-10 mt-6 text-xl">Hello,</p>
            <p className="px-10 py-6 h-36">
              Lorem ipsum dolor sit amet conse consectetur. Semper accumsan.Lorem ipsum dolor sit amet conse consectetur. Semper accumsan.
            </p>
            <div className="px-10">
              <button className="bg-[#F8444F] px-6 py-3 text-white rounded-lg">
                Send
              </button>
            </div>
          </div>
        </div>

      </div>
      <div className="w-full h-px bg-rose-400 mt-16">
      </div>
      <JumpButton />
      <Footer />
    </div>
  );
}

export default ContactUs;
