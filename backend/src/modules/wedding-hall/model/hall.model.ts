import mongoose, { Model } from 'mongoose';
import {Hall} from '../schema/hall.schema'
import HallSchema from '../schema/hall.schema';

const HallModel: Model<Hall> = mongoose.model<Hall>('Hall', HallSchema);

export default HallModel;