
let otpStore = {}; 

const storeOTP = (email, otp) => {
    otpStore[email] = otp;

    setTimeout(() => {
        delete otpStore[email];
    }, 5 * 60 * 1000); 
};

const deleteOTP = (email) => {
    delete otpStore[email];
};

const getStoredOTP = (email) => {
    return otpStore[email];
};

module.exports = { getStoredOTP, storeOTP, deleteOTP};


