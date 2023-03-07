import { Router } from 'express';
import { User, findOne } from '../models/user.js';
import { create } from '../models/session.js';

const signinRouter = Router();

// Login user route
signinRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user from db
  const checkedUser = await findOne({ email });
  if (checkedUser) {
    return res.status(401).json({ 
      message: `This email: ${email} is already used`
    });
  }
  
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });

  try {
    const newUser = await create(user);
    res.status(201).json(newUser);
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
});

export { signinRouter };
