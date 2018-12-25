import React from 'react';
import UserInfo from './UserInfo';
import UserRecipe from './UserRecipe';
import WithAuth from '../withAuth';

const Profile = ({ session }) => (
    <div>
        Profile
    <UserInfo session={session} />
        <UserRecipe session={session} />
    </div>
)

export default WithAuth(session => session && session.getCurrentUSer)(Profile);