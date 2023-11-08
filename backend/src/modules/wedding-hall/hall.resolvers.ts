import jwt from "jsonwebtoken";
import HallModel from "./model/hall.model";
import { GraphQLError } from "graphql";
import { CreateHallArg, UpdateHallArg } from "./interfaces/hall.interface";



export default {
  Query: {
    halls: async () => {
      const halls = await HallModel.find();
      return halls;
    },
  },
  Mutation: {
    createHall: async (_: any, { hallname, address, price }: CreateHallArg, { access_token }: any) => {
      try {
        const userID = jwt.verify(access_token, "n120");

        const hall = await HallModel.findOne({ admin: userID });

        if (hall) {
          return new Error("You already have a hall");
        }

        const newHall = await HallModel.create({
          hallname,
          address,
          price,
          admin: userID,
        });

        return { success: true, data: newHall };
      } catch (error) {
        return new Error("Internal server error");
      }
    },
    updateHall: async (_: any, { hallname, address, price, orderDays }: UpdateHallArg, { access_token }: any) => {
      try {
        const userID = jwt.verify(access_token, "n120");

        const hall = await HallModel.findOneAndUpdate(
          { admin: userID },
          { hallname, address, price, orderDays },
          { new: true }
        );

        if (!hall) {
          return new GraphQLError("Hall not found or user is not the admin");
        }

        return { success: true, data: hall };
      } catch (error) {
        return ("Internal server error");
      }
    },
    createOrder: async (_: any, { orderDays }: { orderDays: string[] }, { access_token }: any) => {
      try {
        const userID = jwt.verify(access_token, "n120") as string;

        const hall = await HallModel.findOne({ admin: userID });

        if (!hall) {
          throw new GraphQLError("Hall not found or user is not the admin");
        }

        const existingOrderDays = hall.orderDays;

        for (const day of orderDays) {
          if (existingOrderDays.includes(day)) {
            throw new GraphQLError(`Day ${day} is already added to the order`);
          }
        }

        hall.orderDays.push(...orderDays);
        await hall.save();

        return { success: true, data: hall };
      } catch (error) {
        return ("Internal server error");
      }
    },
    deleteHall: async (_: any, __: any, { access_token }: any) => {
      try {
        const userID = jwt.verify(access_token, "n120");

        const result = await HallModel.findOneAndDelete({ admin: userID });

        if (!result) {
          return new Error("No halls found for the user");
        }

        return { success: true, message: "All user halls deleted successfully" };
      } catch (error) {
        return new Error("Internal server error");
      }
    },
  },
};
