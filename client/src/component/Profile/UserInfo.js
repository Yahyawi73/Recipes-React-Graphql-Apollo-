import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-US');
    const newTime = new Date(date).toLocaleTimeString('en-US');
    return `${newDate} at ${newTime}`;
}

const UserInfo = ({ session }) => (
    <div>
        <h3>UserInfo</h3>
        <p>User Name: {session.getCurrentUSer.userName}</p>
        <p>Email: {session.getCurrentUSer.email}</p>
        <p>Join Date: {formatDate(session.getCurrentUSer.jointDate)}</p>
        {session.getCurrentUSer.favorites.map(favorites =>
            <li key={favorites._id}>
                <Link to={`/${favorites._id}`}>
                    <p>{favorites.name}</p>
                </Link>
            </li>
        )}
        {!session.getCurrentUSer.favorites.length && (
            <p>
                <strong>
                    You have no favorites currently. Go add some!
                </strong>
            </p>
        )}
    </div>
)

export default UserInfo;