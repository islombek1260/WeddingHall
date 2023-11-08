import mongoose, { Model } from 'mongoose';
import {User} from '../schema/user.schema'
import UserSchema from '../schema/user.schema';

const UserModel: Model<User> = mongoose.model<User>('User', UserSchema);

export default UserModel;