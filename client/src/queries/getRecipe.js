import { gql } from 'apollo-boost';

export const GET_RECIPE = gql`  
query ($_id: ID!){
    getRecipe(_id: $_id){
        _id
        name
        description
        category
        createDate
        userName
        instruction
        likes
        userName
}
}
`;