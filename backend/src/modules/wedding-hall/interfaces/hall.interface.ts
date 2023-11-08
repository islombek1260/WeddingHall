import { Types } from "mongoose";

export interface CreateHallArg {
  hallname: string;
  address: string;
  price: string;
}

export interface UpdateHallArg {
    hallname: string;
    address: string;
    price: string;
    orderDays: string
}