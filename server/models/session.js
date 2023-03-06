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

const Session = model('Session', sessionSchema);

export default Session;