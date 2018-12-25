import { gql } from 'apollo-boost';

export const ADD_RECIPE = gql`
mutation addRecipe($inputRecipe: InputRecipe){
    addRecipe(input: $inputRecipe){
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