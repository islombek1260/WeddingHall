import { readFileSync } from 'fs'
import { resolve } from 'path'

import resolvers from './user.resolvers'
const typeDefs = readFileSync(resolve('src', 'modules', 'users/user.schema.gql'), 'utf-8')

export default {
	resolvers,
	typeDefs,
}
