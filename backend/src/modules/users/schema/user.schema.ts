import { Document, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  avatar: string;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

export default UserSchema;