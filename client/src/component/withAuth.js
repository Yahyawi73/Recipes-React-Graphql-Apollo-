import React from 'react';

import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../queries/getCurrentUser';

const withAuth = conditionFunc => Component => props => (
    <Query query={GET_CURRENT_USER}>
        {
            ({ loading, data }) => {
                if (loading) return null;
                return conditionFunc(data) ? <Component {...props} /> : <Redirect to='/' />
            }
        }
    </Query>
);

export default withAuth;
