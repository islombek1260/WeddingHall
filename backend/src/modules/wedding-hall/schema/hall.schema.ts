import { Document, Schema } from 'mongoose';

export interface Hall extends Document {
  hallname: string;
  address: string;
  price: string;
  orderDays: string[]
  admin: string;
}

const HallSchema: Schema = new Schema({
  hallname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  orderDays: [{
    type: String
  }],
  admin: {
    type: String,
  }
});

export default HallSchema;