import jwt from "jsonwebtoken";
import UserModel from "./model/users.model";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { UpdateUsersArgs, signUpArgs } from "./interfaces/user.interface";


export default {
  Query: {
    users: async () => {
      try {
        const users = await UserModel.find();
        return users;
      } catch (error) {
        return ('error');
      }
    },
  },
  Mutation: {
    signUp: async (_: any, { username, password }: signUpArgs) => {
      try {
        const user = await UserModel.findOne({ username });
    
        if (user) {
          return new GraphQLError("already logged in");
        }
    
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser: any = await UserModel.create({
          username,
          password: hashPassword,
        })
    
        const TOKEN = jwt.sign({ _id: newUser._id }, "n120");
        return { success: true, data: newUser, access_token: TOKEN };
      } catch (error) {
        return new GraphQLError("Internal Server Error", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },

    signIn: async (_: any, { username, password }: signUpArgs) => {
      try {
        const user = await UserModel.findOne({ username });

        if (!user) {
          return new GraphQLError("user is not defined", {
            extensions: {
              code: "NOT_FOUND",
              http: { status: 404 },
            },
          });
        }

        const isTrue = bcrypt.compareSync(password, user.password);
        if (!isTrue) {
          return new GraphQLError("user or password wrong", {
            extensions: {
              code: "BAD_REQUEST",
              http: { status: 400 },
            },
          });
        }

        const TOKEN = jwt.sign({ _id: user._id }, "n120");
        return { success: true, data: user, access_token: TOKEN };
      } catch (error) {
        return new GraphQLError("Internal Server Error", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },

    updateUser: async (_: any, { username, password, avatar }: UpdateUsersArgs, { access_token }: any) => {
      try {
        const { _id }: any = jwt.verify(access_token, 'n120')

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.findByIdAndUpdate({ _id }, { username: username, password: hashPassword, avatar: avatar });
        console.log(user, 'updated');
        if (!user) {
          throw new Error("User not found");
        }
        return { success: true, data: user }
      } catch {
        return { success: false, data: "you dont have access" };
      }
    },

    deleteUser: async (_: any, body: any, { access_token }: any) => {
      try {
        const { _id }: any = jwt.verify(access_token, 'n120');
        const user: any = await UserModel.findOneAndDelete({ _id });

        if (!user) {
          throw new Error("you dont have access");
        }

        return { success: true, data: "user deleted" };
      } catch (error) {
        return { success: false, data: "you dont have access" };
      }
    },
  },
};
