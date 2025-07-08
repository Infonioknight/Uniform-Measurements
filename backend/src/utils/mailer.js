const nodemailer = require("nodemailer");
require("dotenv").config();
const userSchema = require("../model/userModel.js");
const cron = require('node-cron');


const sendEmail = async (email, subject, html) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        const mailOptions = { 
            from: process.env.MAIL_USER, 
            to: email, 
            subject,
             html 
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

// password reset template
const passwordResetTemplate = (token, user) => {
	return `<p> Hi <strong>${user.name} </strong></p>,
	<br/>
	 <p>We received a request to reset your password. Please use the code below to reset your password:</p>
        <h3>${token}</h3>
        <p>If you did not request a password reset, please ignore this email or contact support if you have any concerns.</p>
        <p>Thank you,<br>Your Company Name Support Team</p>
	`
}

//registration template
const registrationTemplate = (token, user) => {
    return `<p>Hi <strong>${user.name} </strong></p>,
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
      `
}

const accountDeletionTemplate = (user) => {
  const name = user.name || user.google?.name || 'User';
  const email = user.email || user.google?.email || ' ';
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #d9534f; text-align: center; ">Account Deletion Notice</h2>
        <p>Hi <strong>${name} </strong>,</p>
        <br/>
        <p>We are writing to inform you that your account associated with <strong>${email}</strong> 
        has been marked for deletion.</p>
        <br/>
        <p>Your data will be permanently deleted after 30 days from the deletion request. 
        However, if you change your mind and would like to continue using our services, 
        you can recover your account within the next 30 days.</p>
        <br/>
        <p><strong>To recover your account</strong>, simply log in with your credentials, 
        and you will be guided through the recovery process or click on the link below
        <br/>
         <br/>
         <a href="${process.env.FRONTEND_DOMAIN}/users/recover-account/${user._id}" 
           style="display: inline-block; background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           Recover Your Account
        </a>
        <br/>
         <br/>
        If no action is taken within this period, 
        your account will be permanently deleted, 
        and you will no longer have access to our services.</p>
        <br/>
        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        
        <p>Best Regards,<br>Zimutail</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        
        <p style="font-size: 12px; color: #d9534f;">
          If you did not request this deletion, please contact us immediately to secure your account.
        </p>
      </div>
    `;
  };
  

  
  const accountRecoveryReminderTemplate = (user) => {
    const name = user.name || user.google?.name || 'User';
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <h3 style="color: #d9534f; text-align: center; "> Recover Your Account</h3>
        <p>Hi <strong>${name}</strong>,</p>
        <br/>
        <p>
          This is a reminder that your account will be permanently deleted in the next 24 hours. If you wish to keep your account, please recover it as soon as possible.
        </p>
        <p>
        <br/>
          Once your account is permanently deleted, all associated data will be lost, and it will not be recoverable. To avoid this, click on the link below and follow the recovery process.
        </p>
        <br/>
        <a href="${process.env.FRONTEND_DOMAIN}/users/recover-account/${user._id}" 
           style="display: inline-block; background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           Recover Your Account
        </a>
        <p style="margin-top: 20px;">Thank you,</p>
        <p>Best Regards,<br>Zimutail</p>
      </div>
    `;
  };
  

  const permanentDeletionTemplate = (user) => {
    const name = user.name || user.google?.name || 'User';
    const email = user.email || user.google?.email || ' ';
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
       <h3 style="color: #d9534f; text-align: center; ">Account Permanently Deleted</h3>
        <p>Dear <strong>${name}</strong>,</p>
        <br/>
        <p>We are writing to inform you that your account associated with the email address <strong>${email}</strong> has been permanently deleted.</p>
        <br/>
        <p>This action was taken because you did not recover your account within the 30-day grace period. All your data has been removed from our system, and this process cannot be undone.</p>
        <p>If you have any questions or require further assistance, please don't hesitate to contact our support team.</p>
        <br/>
        <p>Thank you for being a part of our community.</p>
        <br/>
         <p>Best Regards,<br>Zimutail</p>
        <p><a href="${process.env.FRONTEND_DOMAIN}" style="color: #1a73e8;">Visit our website</a></p>
      </div>
    `;
  };

  const adminDeleteUserTemplate = (user) => {
    const name = user.name || user.google?.name || 'User';
    const email = user.email || user.google?.email || ' ';
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h3 style="color: #d9534f; text-align: center; ">Account Deletion Notification </h3>
        <p>Dear <strong>${name}</strong>,</p>
        <br/>
        <p>We are writing to inform you that your account associated with <strong>${email}</strong> 
        has been deleted by one of our administrators.</p>
        <p>All your data associated with this account has been permanently deleted from our system. 
        If you believe this action was taken in error or have any concerns, please reach out to our support team for assistance.</p>
        <br/>
        <br/>
        <p>Best Regards,<br>Zimutail Support Team</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 12px; color: #d9534f;">
          If you did not request this deletion or have any concerns, please contact us immediately.
        </p>
      </div>
    `;
  };
  


  

module.exports = {
    sendEmail,
    passwordResetTemplate,
    registrationTemplate,
    accountDeletionTemplate,
    accountRecoveryReminderTemplate,
    permanentDeletionTemplate,
    adminDeleteUserTemplate,
};

