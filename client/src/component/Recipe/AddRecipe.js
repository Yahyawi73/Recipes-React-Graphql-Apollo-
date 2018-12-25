import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import { GET_USER_RECIPES } from "../../queries/getUserRecipes";
import { ADD_RECIPE } from '../../greaphql/mutations/addRecipe';
import GET_ALL_RECIPES from '../../queries/getAllRecipes';
import Error from '../Auth/Error';
import withAuth from '../withAuth';

const initialState = {
    name: "",
    description: "",
    category: "",
    instruction: "",
    userName: "",
    data: null,
    error: null,
};
class AddRecipe extends React.Component {

    state = { ...initialState };

    handleChange = (event) => {
        let formValue = {};
        const { name, value } = event.target;
        formValue[name] = value;
        this.setState({ ...formValue });
    }

    validateForm = () => {
        const { name, description, category, instruction } = this.state;
        const isValidate = !name || !category || !description || !instruction;
        return isValidate;
    }

    clearState = () => {
        this.setState({ ...initialState });
    }

    updateCash = (cache, { data: { addRecipe } }) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES })
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes],
            }
        })
    }

    render() {
        let { userName } = this.props.session.getCurrentUSer;
        const { name, description, category, instruction } = this.state;
        if (!userName) {
            return <div>Error You are not a user</div>
        }
        return (
            <div className="App">
                <h2>Add Recipe</h2>
                <Mutation
                    mutation={ADD_RECIPE}
                    refetchQueries={() => [
                        { query: GET_USER_RECIPES, variables: { userName } }
                    ]
                    }
                    update={this.updateCash}>
                    {
                        (addRecipe, { data, loading, error }) => {
                            if (loading) return <div>Loading...</div>
                            return (
                                <form className="form" onSubmit={(event) => {
                                    event.preventDefault();
                                    addRecipe({
                                        variables: {
                                            inputRecipe: {
                                                name,
                                                userName,
                                                description,
                                                category,
                                                instruction,
                                            }
                                        }
                                    }).then(data => {
                                        this.clearState();
                                        this.props.history.push('/');
                                    })
                                }}>
                                    <input type="text" name="name" onChange={this.handleChange} value={name} />
                                    <input type="text" name="description" onChange={this.handleChange} value={description} />
                                    <select name="category" onChange={this.handleChange} value={category}>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Dinner">Dinner</option>
                                        <option value="Snack">Snack</option>
                                    </select>
                                    <textarea type="text" name="instruction" onChange={this.handleChange} value={instruction} />
                                    <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Submit</button>
                                    {error && <Error error={error} />}
                                </form>
                            )
                        }
                    }
                </Mutation>
            </div>
        )
    }
}

export default withAuth(session => session && session.getCurrentUSer)(withRouter(AddRecipe));