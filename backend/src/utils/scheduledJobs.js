// cronJobs.js

const userSchema = require("../model/userModel.js");
const cron = require('node-cron');
const {
  sendEmail,
  accountRecoveryReminderTemplate,
  permanentDeletionTemplate,
} = require("./mailer.js");

// Schedule the job to run once a day at midnight to send account recovery reminders
cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    const twentyNineDaysAgo = new Date(now.getTime() - (29 * 24 * 60 * 60 * 1000));

    // Find users who marked their account for deletion exactly 29 days ago
    const usersToRemind = await userSchema.find({
      isDeleted: true,
      deletionDate: { 
        $gte: twentyNineDaysAgo,
        $lt: now
      }
    });
    
    console.log(`Found ${usersToRemind.length} users to send reminder emails. ${usersToRemind.map(user => user.email)}`);

    // Send reminder emails to users
    const emailPromises = usersToRemind.map(user => {
      const htmlContent = accountRecoveryReminderTemplate(user);
      return sendEmail(user.email, 'Account Deletion Reminder - 24 Hours Left', htmlContent);
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);
    console.log('Reminder emails sent to users whose accounts will be deleted in 24 hours.');

  } catch (error) {
    console.error('Error sending reminder emails:', error);
  }
});

// Schedule the job to run every 5 minutes to delete accounts
cron.schedule('0 0  * * *', async () => { // Change to run every 5 minutes
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)); 

    // Find users who marked their account for deletion exactly 30 days ago
    const usersToDelete = await userSchema.find({
      isDeleted: true,
      deletionDate: { 
        $gte: thirtyDaysAgo,
        $lt: now
      }
    });

    console.log(`Found ${usersToDelete.length} users to permanently delete. ${usersToDelete.map(user => user.email)}`);

    // Permanently delete users' accounts
    const deletionPromises = usersToDelete.map(user => {
      const htmlContent = permanentDeletionTemplate(user);
      sendEmail(user.email, 'Account Permanently Deleted', htmlContent);
      return userSchema.deleteOne({ _id: user._id });
    });

    // Wait for all deletion operations to complete
    await Promise.all(deletionPromises);
    console.log('Permanently deleted users whose accounts were marked for deletion 30 days ago.');

  } catch (error) {
    console.error('Error deleting user accounts:', error);
  }
});
