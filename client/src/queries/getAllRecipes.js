import { gql } from 'apollo-boost';

const GET_ALL_RECIPES = gql`  
query {
    getAllRecipes{
     _id
     name
     description
    }
    }
`;

export default GET_ALL_RECIPES;