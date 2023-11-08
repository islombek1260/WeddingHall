import { readFileSync } from 'fs'
import { resolve } from 'path'

import resolvers from './hall.resolvers'
const typeDefs = readFileSync(resolve('src', 'modules', 'wedding-hall/hall.schema.gql'), 'utf-8')

export default {
	resolvers,
	typeDefs,
}