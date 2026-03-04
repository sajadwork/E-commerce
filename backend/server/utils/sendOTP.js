// Mock utility for sending OTP (e.g. via Twilio or Nodemailer)
const sendOTP = async (phoneOrEmail, otp) => {
    // In a real application, implement preferred SMS or Email service here.
    console.log(`Sending OTP ${otp} to ${phoneOrEmail}`);
    return true;
};

export default sendOTP;
