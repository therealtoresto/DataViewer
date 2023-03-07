import { Router } from 'express';
import { User, findById } from '../models/user.js';
import { authenticate } from '../middlewares/auth.js';

const userRouter = Router();

// Get all users route
userRouter.get('/users', authenticate, async (req, res) => {
  const user = await findById(req.userId);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'You have no permissions' });
  }
  const users = await fetch('https://jsonplaceholder.typicode.com/users');
  const result = await users.json();
  res.json(result);
});

// Route for obtaining user data
userRouter.get('/users/:userId', authenticate, async (req, res) => {
  const userId = req.params.userId;
  const result = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const user = await result.json();
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

export { userRouter };
