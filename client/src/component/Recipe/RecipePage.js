import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";
import { GET_RECIPE } from '../../queries/getRecipe';
import LikeRecipe from './LikeRecipe';
// import { Query } from 'react-apollo';


const RecipePage = ({ match }) => {
    const { _id } = match.params;
    return (
        <Query query={GET_RECIPE} variables={{ _id }}>
            {({ error, loading, data }) => {
                if (loading) return <div>Loainding...</div>
                if (error) return <div>Error</div>
                return (
                    <div>
                        <p>{data.getRecipe.name}</p>
                        <p>Description: {data.getRecipe.description}</p>
                        <p>Category: {data.getRecipe.category}</p>
                        <p>Instruction: {data.getRecipe.instruction}</p>
                        <p>Creatted By: {data.getRecipe.userName}</p>
                        <LikeRecipe _id={data.getRecipe._id} />
                    </div>
                )
            }}
        </Query>
    )
}

export default withRouter(RecipePage);