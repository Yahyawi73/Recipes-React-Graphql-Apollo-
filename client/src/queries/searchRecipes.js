import { gql } from 'apollo-boost';

export const SEARCH_RECIPES = gql`  
query ($searchItem: String){
    searchRecipes(searchItem: $searchItem){
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