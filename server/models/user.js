import mongoose from 'mongoose';
import { createHash } from '../util/hash.js';

const { Schema, ObjectId, model, updateOne } = mongoose;

const userSchema = new Schema({
  id: {
    type: ObjectId,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  access: {
    type: [Number],
    required: true,
    default: []
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  
  createHash(user, next);
});

/**
 * 
 * @param {User} data
 * @returns {User}
 */
const create = async (data) => {
  const user = new User(data);
  return await user.save();
}

/**
 * @param {null}
 * @returns {User[]}
 */
const findAll = async () => {
  return await User.find();
}

/**
 * @param {null}
 * @returns {User[]}
 */
const findOne = async (data) => {
  return await User.findOne(data);
}

/**
 * @param {number} id
 * @returns {User}
 */
const findById = async (id) => {
  return await User.findById(id);
}

/**
 * @param {string} userId
 * @param {[number]} ids
 * @returns {}
 */
const setAccess = async (userId, ids) => {
  const user = await findById(userId);
  if (!user) return 'User is not found';
  const access = [];
  for (let id of ids) {
    if (access.includes(id)) continue;
    access.push(id);
    access.sort();
  }
  await user.updateOne({ access });
}

/**
 * @typedef {Schema} User
 */
const User = model('User', userSchema);

export { User, create, findAll, findById, findOne, setAccess };
