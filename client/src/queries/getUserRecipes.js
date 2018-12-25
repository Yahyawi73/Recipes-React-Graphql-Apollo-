import { gql } from 'apollo-boost';

export const GET_USER_RECIPES = gql`
  query($userName: String!) {
    getUserRecipes(userName: $userName) {
      _id
      name
      likes
    }
  }
`;