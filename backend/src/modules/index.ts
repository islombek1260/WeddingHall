import { makeExecutableSchema } from "@graphql-tools/schema";
import User from "./users";
import Hall from "./wedding-hall"

export default makeExecutableSchema({
  typeDefs: [User.typeDefs, Hall.typeDefs],
  resolvers: [User.resolvers, Hall.resolvers],
});
