import passport from './passport/google';
import { Application } from 'express';

const frontendHome = process.env['FRONTEND_HOST'] as string;

export const setupAuthAPIs = (app: Application) => {
  app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: frontendHome }),
    (_, res): void => {
      res.redirect(frontendHome);
    },
  );
}