import jwt from 'jsonwebtoken';
import { Session } from '../models/session.js';
import { readFileSync } from "fs";

const config = JSON.parse(readFileSync("./config.json"));
console.log(config);

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'You are not authorized' });
  }

  try {
    const payload = jwt.verify(token, config.development.ACCESS_TOKEN_SECRET);
    const session = await Session.findOne({ userId: payload.userId, token });
    if (!session) {
      return res.status(401).json({ message: 'Session not found' });
    }
    req.userId = session.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
