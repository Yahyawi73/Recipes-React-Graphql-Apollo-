import React, { Component } from 'react';
import RecipeItem from './Recipe/RecipeItem';
import { Query } from "react-apollo";

import GET_ALL_RECIPES from '../queries/getAllRecipes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <div> Loading ... </div>
            if (error) return <div>ERROR</div>
            return <ul>{data.getAllRecipes.map(recipe => (

              <RecipeItem key={recipe._id} {...recipe} />
            ))}</ul>
          }}
        </Query>
      </div>
    );
  }
}

export default App;
