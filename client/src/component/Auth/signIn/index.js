import React, { Component } from 'react';
import { Mutation } from "react-apollo";

import FormSignIn from './FormSignIn';
import { SIGN_IN_USER } from '../../../greaphql/mutations/signInUser';

class SingnIn extends Component {
    render() {
        const { refetch } = this.props;
        return (
            <Mutation mutation={SIGN_IN_USER}>
                {(signinUser) => <FormSignIn onSubmit={signinUser} refetch={refetch} />}
            </Mutation>
        )
    }
}

export default SingnIn;