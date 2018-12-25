import { gql } from 'apollo-boost';

export const DELETE_USER_RECIPE = gql`
mutation ($_id: ID!){
    deleteUserRecipe(_id: $_id) {
    _id
    name
    category
    description
    instruction
    createDate
    likes
    userName
    }
  }
`;