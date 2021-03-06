import React from "react";
import { Link } from "react-router-dom";

import { Query, Mutation } from "react-apollo";
import { GET_USER_RECIPES } from "../../queries/getUserRecipes";
import GET_ALL_RECIPES from "../../queries/getAllRecipes";
import { GET_CURRENT_USER } from "../../queries/getCurrentUser";
import { DELETE_USER_RECIPE } from "../../greaphql/mutations/deleteRecipe";

const handleDelete = async (deleteUserRecipe) => {
  const confirmDelet = window.confirm('Are you sure you want to delete this Recipe');
  if (confirmDelet) {
    await deleteUserRecipe().then(({ data }) => {
    })
  }
}

const UserRecipes = ({ session: { getCurrentUSer: { userName } } }) => (
  <Query query={GET_USER_RECIPES} variables={{ userName: userName }}>
    {({ data, loading, error }) => {
      if (loading) return <div>loading...</div>;
      if (error) return <div>Error</div>;
      return (
        <ul>
          <h3>Your Recipes</h3>
          {!data.getUserRecipes.length && (
            <p>
              <strong>You have not added any recipes yet</strong>
            </p>
          )}
          {data.getUserRecipes.map(recipe => (
            <li key={recipe._id}>
              <Link to={`/recipes/${recipe._id}`}>
                <p>{recipe.name}</p>
              </Link>
              <p style={{ marginBottom: "0" }}>Likes: {recipe.likes}</p>
              <Mutation
                mutation={DELETE_USER_RECIPE}

                variables={{ _id: recipe._id }}

                refetchQueries={() => [
                  { query: GET_ALL_RECIPES },
                  { query: GET_CURRENT_USER }
                ]
                }

                update={(cache, { data: { deleteUserRecipe } }) => {
                  const { getUserRecipes } = cache.readQuery({
                    query: GET_USER_RECIPES,
                    variables: { userName }
                  })
                  cache.writeQuery({
                    query: GET_USER_RECIPES,
                    variables: { userName },
                    data: {
                      getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id)
                    }
                  })
                }}>
                {(deleteUserRecipe, attrs = {}) => (
                  <p
                    className="delete-button"
                    onClick={() => handleDelete(deleteUserRecipe)}
                  >
                    {attrs.loading ? 'deleting...' : 'X'}
                  </p>
                )
                }
              </Mutation>

            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default UserRecipes;
