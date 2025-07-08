const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userSchema = require('../model/userModel');

const configurePassport = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // Extract necessary data from the Google profile object
        const newUser = {
          "google.name": profile.displayName, // Use displayName for the name
          "google.email": profile.emails[0].value, // Use emails[0].value for email
          active: true,
        };

        try {
          // Find Google user and local user by email
          let googleUser = await userSchema.findOne({ 'google.email': profile.emails[0].value });
          let localUser = await userSchema.findOne({ email: profile.emails[0].value });

          if (googleUser && localUser) {
            done(null, googleUser);
          }
          else if (googleUser) {
            console.log('Google user found');
            done(null, googleUser);
          } else if (localUser) {
            // Update the existing local user with Google information
            localUser.google = {
              name: profile.displayName,
              email: profile.emails[0].value,
            };
            localUser.active = true;
            await localUser.save();
            console.log('Local user updated with Google info');
            done(null, localUser);
          } else {
            // Create new user with Google information
            const user = await userSchema.create(newUser);
            console.log('New user created with Google info');
            done(null, user);
          }
        } catch (err) {
          console.log('Error during Google authentication:', err.message);
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userSchema.findById(id);
      if (user) {
        console.log('User found during deserialization');
        return done(null, user);
      }
      console.log('User not found during deserialization');
      return done(null, null);
    } catch (err) {
      console.error('Error during user deserialization:', err.message);
      return done(err, null);
    }
  });
};

module.exports = configurePassport;