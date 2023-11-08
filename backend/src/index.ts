import { ApolloServer } from 'apollo-server';
import schema from './modules';
import { createConnection } from './db/config';

async function starter() {
  try {
    await createConnection();
    console.log('Connected to MongoDB');

    const server = new ApolloServer({
      schema,
      context: ({ req }) => {
        const token = req.headers.authorization || '';
        return { access_token: token };
      },
    });

    const { url } = await server.listen(4000);
    console.log(`🚀 Server running at ${url}`);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

starter();