const nodemailer = require("nodemailer");
require("dotenv").config();

const Mailsender = async (email, token) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Your OTP for SignUp',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Welcome to Our Service!</h2>
          <p>Thank you for signing up. To complete your registration, please use the following OTP (One-Time Password):</p>
          <div style="padding: 10px; background-color: #f4f4f4; border-radius: 5px; display: inline-block;">
            <h3 style="margin: 0;">${token}</h3>
          </div>
          <p>This OTP is valid for the next 5 minutes. Please enter it in the registration form to complete your signup process.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
          <br>
          <p>Best Regards,<br>Zimutail</p>
        </div>
      `,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    return { success: true, message: 'Email sent successfully' };
  } catch (err) {
    console.error('Error sending email:', err.message);
    throw new Error('Failed to send email');
  }
};

module.exports = Mailsender;
