import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  token: {
    type: String
  },
});

/**
 * 
 * @param {Session} data
 * @returns {Session}
 */
const create = async (data) => {
  const session = new Session(data);
  return await session.save();
}

const Session = model('Session', sessionSchema);

export { Session, create };