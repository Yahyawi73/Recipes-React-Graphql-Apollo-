import { gql } from 'apollo-boost';

export const LIKE_RECIPE = gql`
mutation($_id: ID!, $userName: String!) {
  likeRecipe(_id: $_id, userName: $userName) {
      _id
      likes
    }
}
`;