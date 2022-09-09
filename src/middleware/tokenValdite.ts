import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

/*******************       verifying if the token sent is a match for the user's token.         ***************/
const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret as string);

    next();
  } catch (error) {
    res.status(401);
    res.send('invaled token');
    return;
  }
};

export default verifyAuthToken;
