import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../../../mongo/models/User';
import { fetchGraphql } from '../../../utils/graphql/fetch';
import { userByIdQuery, insertUserMutation } from './graphql/queries';

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
      
      // get user info from hasura GQL server
      const gqlData = await fetchGraphql(userByIdQuery(user.id));
      const existingUser = gqlData?.data?.users_by_pk;

      console.log(JSON.stringify(existingUser, null, 2))
      console.log(JSON.stringify(user, null, 2))

      if (existingUser) {
        cb(undefined, { ...user, ...existingUser });

        return;
      }

      // save user to postgre via hasura
      const gqlData2 = await fetchGraphql(insertUserMutation(user));
      const newUser = gqlData2?.data?.insert_users_one || {};

      cb(undefined, newUser);
      console.log(JSON.stringify(gqlData2, null, 2))
    }
  ),
);
