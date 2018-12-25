import React from 'react';
import { Link } from 'react-router-dom';

const searchItem = ({ _id, name, likes }) => {
    return (
        <li key={_id}>
            <Link to={`/recipe/${_id}`}>
                <h4>{name}</h4>
                <p>Likes: {likes}</p>
            </Link>
        </li>
    )
}

export default searchItem;