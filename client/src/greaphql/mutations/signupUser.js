import { gql } from 'apollo-boost';

export const SIGN_UP_USER = gql`
mutation signupUser($inputUserSignUp: InputUser){
    signupUser(input: $inputUserSignUp){
        token
    }
   }
`;