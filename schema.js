import { gql } from 'apollo-server';

exports.typeDefs = gql`
type Recipe {
    _id: ID
    name: String
    category: String
    description: String
    instruction: String
    createDate: String
    likes: Int
    userName: String
}

type User {
    _id: ID
    userName: String 
    password: String
    email: String!
    jointDate: String
    favorites: [Recipe]
}

type Token {
    token: String!
}

input InputUser {
    userName: String!
    email: String!
    password: String!
}

input InputRecipe {
    name: String!,
    category: String!,
    description: String!,
    instruction: String,
    userName: String
}

type Query {
    getAllRecipes: [Recipe]
    getRecipe(_id: ID): Recipe

    getCurrentUSer: User
    getUserRecipes(userName: String!): [Recipe]
    
    searchRecipes(searchItem: String): [Recipe]

}

type Mutation {
    addRecipe(input: InputRecipe): Recipe
    deleteUserRecipe(_id: ID): Recipe
    likeRecipe(_id: ID!, userName: String!): Recipe
    unLikeRecipe(_id: ID!, userName: String!): Recipe

    signupUser(input: InputUser): Token
    signinUser(input: InputUser): Token
}
`;
