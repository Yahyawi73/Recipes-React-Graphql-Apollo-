import React, { Component } from 'react';
import { Mutation } from "react-apollo";

import FormSignUp from './FormSignUp';
import { SIGN_UP_USER } from '../../../greaphql/mutations/signupUser';

class SingnUp extends Component {
    render() {
        const { refetch } = this.props;
        return (
            <Mutation mutation={SIGN_UP_USER}>
                {(signupUser) => <FormSignUp onSubmit={signupUser} refetch={refetch} />}
            </Mutation>
        )
    }
}

export default SingnUp;