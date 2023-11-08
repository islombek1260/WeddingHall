import { Types } from "mongoose";

export interface signUpArgs {
  username: string;
  password: string;
}

export interface UpdateUsersArgs {
  _id: Types.ObjectId;
  username: string;
  password: string;
  avatar: string;
}