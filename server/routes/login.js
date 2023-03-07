import { Router } from 'express';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findOne } from '../models/user.js';
import { create } from '../models/session.js';

const { sign } = jwt;
const loginRouter = Router();

// Login user route
loginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user from db
  const user = await findOne({ email });
  if (!user) {
    return res.status(401).json({ 
      message: `User with email: ${email} not found`
    });
  }
  
  // Match password
  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  
  // Create session token
  const token = sign({ userId: user._id }, 'secret');
  
  // Save session in db
  const session = await create({ userId: user._id, token });
  
  // Return token
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'User is authorized' });
});

  export { loginRouter };
