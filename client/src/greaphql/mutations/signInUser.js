import { gql } from 'apollo-boost';

export const SIGN_IN_USER = gql`
mutation signinUser($inputUserSign: InputUser){
    signinUser(input: $inputUserSign){
        token
    }
   }
`;