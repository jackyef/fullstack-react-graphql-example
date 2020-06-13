import { NextFunction, Request, Response } from "express";

type Role = 'user' | 'owner' | 'admin';

const createAccessControl = (role: Role) => {
  // create an express middleware that only allow specific role
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session?.passport?.user;

    if (user && user.role === 'admin') {
      next();

      return;
    }

    if (!user || user.role !== role) {
      res.status(403);
      res.send();

      return;
    } else {
      next();
    }
  }
}

export const userOnly = createAccessControl('user');
export const ownerOnly = createAccessControl('owner');
export const adminOnly = createAccessControl('admin');
