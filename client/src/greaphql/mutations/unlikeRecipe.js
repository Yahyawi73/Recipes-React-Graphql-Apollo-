import { gql } from 'apollo-boost';

export const UNLIKE_RECIPE = gql`
mutation($_id: ID!, $userName: String!) {
    unLikeRecipe(_id: $_id, userName: $userName) {
      _id
      likes
    }
}
`;