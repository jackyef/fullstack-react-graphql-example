import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../../../mongo/models/User';

passport.serializeUser(
  (user: User, done): void => {
    done(null, user);
  },
);

passport.deserializeUser(
  (user: User, done): void => {
    done(null, user);
  },
);

const profileToUser = async (profile: any): Promise<User> => {
  const email = profile.emails[0].value;

  return {
    name: profile.displayName,
    email,
    id: profile.id,
    role: 'user',
  };
};

export default passport.use(
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_OAUTH_CLIENTID'] as string,
      clientSecret: process.env['GOOGLE_OAUTH_SECRET'] as string,
      callbackURL: process.env['GOOGLE_OAUTH_CALLBACK_URL'] as string,
    },
    async (__, ___, profile, cb): Promise<void> => {
      const user = await profileToUser(profile);
      const User = mongoose.model('User');
      const existingUser = await User.findOne({ id: user.id });

      if (existingUser) {
        cb(undefined, { ...user, ...existingUser.toObject() });

        return;
      }

      new User(user)
        .save()
        .then(
          (): void => {
            cb(undefined, user);
          },
        );
    }
  ),
);
