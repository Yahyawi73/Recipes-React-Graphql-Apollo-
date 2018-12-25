import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ _id, name, description }) => (
    <li key={_id}>
        <Link to={`/recipe/${_id}`}><h4>{name}</h4></Link>
        <p>
            <strong>
                {description}
            </strong>
        </p>
    </li>
)

export default RecipeItem;