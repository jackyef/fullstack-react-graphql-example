import passport from './passport/google';
import { Application } from 'express';

const frontendHome = `${process.env['FRONTEND_HOST']}:${process.env['FRONTEND_PORT']}` as string;

export const setupAuthAPIs = (app: Application) => {
  app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: frontendHome }),
    (_, res): void => {
      res.redirect(frontendHome);
    },
  );

  app.get('/api/auth/logout', (req, res): void => {
    res.setHeader('Cache-Control', 'no-cache, no-store');

    req.logout();
    res.redirect(frontendHome);
  });

  app.get('/api/auth/status', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store');

    const user = req.session?.passport?.user;

    if (user) {
      const { id, role, name, email } = user;
      
      res.send({
        id,
        role,
        name,
        email,
      })
    } else {
      res.send({
        id: '',
        role: '',
        name: '',
        email: '',
      })
    }
  });
}