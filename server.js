import mongoose from 'mongoose';
import Recipe from './models/Recipe';
import User from './models/User';
//bring in graphql express
const { ApolloServer } = require('apollo-server');

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

//config apollo-server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        token: req.headers.authorization,
        models: {
            Recipe,
            User
        }
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

//connect to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB connectd')
    })
    .catch(err => {
        console.log(err);
    })
