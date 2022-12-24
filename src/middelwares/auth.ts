import * as JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const { TOKEN_SECRET } = process.env;

export const verifyAuthenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : '';
    const secret = TOKEN_SECRET as string;
    JWT.verify(token, secret);

    next();
  } catch (ex) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};
