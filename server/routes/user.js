import { Router } from 'express';
import { findById, setAccess } from '../models/user.js';
import { authenticate } from '../middlewares/auth.js';

const userRouter = Router();

// Get all users route
userRouter.get('/users', authenticate, async (req, res) => {
  const user = await findById(req.userId);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'You have no access' });
  }
  const users = await fetch('https://jsonplaceholder.typicode.com/users');
  const result = await users.json();
  res.json(result);
});

// Route for obtaining user data
userRouter.get('/users/:userId', authenticate, async (req, res) => {
  const user = await findById(req.userId);
  const id = req.params.userId;
  const accessArray = user.access;
  if (user.role !== 'admin' && (!accessArray.includes(id))) {
    return res.status(403).json({ message: 'You have no access' });
  }

  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const result = await data.json();

  res.json(result);
});

// Get authorised user data
userRouter.get('/me', authenticate, async (req, res) => {
  const user = await findById(req.userId);
  res.json(user);
});

// Give access for user to ids
userRouter.post('/users/access', authenticate, async (req, res) => {
  const currentUser = await findById(req.userId);
  if (currentUser.role !== 'admin') {
    return res.status(403).json({ message: 'You have no access' });
  }
  const { id, ids } = req.body;
  await setAccess(id, ids)
  const user = await findById(id);
  res.json(user)
});

export { userRouter };
