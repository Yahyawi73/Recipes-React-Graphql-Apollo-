import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { ApolloConsumer } from "react-apollo"

import SearchItem from './SearchItem';
import { SEARCH_RECIPES } from '../../queries/searchRecipes';

class Search extends React.Component {
    state = {
        searchResult: []
    }
    handleChange = ({ searchRecipes }) => {
        this.setState({
            searchResult: searchRecipes
        })
    }

    render() {
        const { searchResult } = this.state;
        return (
            <ApolloConsumer>
                {
                    (client) => (
                        <div className="App">
                            <input
                                type="search"
                                placeholder="search for Recipes"
                                onChange={async (event) => {
                                    event.persist();
                                    const { data } = await client.query({
                                        query: SEARCH_RECIPES,
                                        variables: { searchItem: event.target.value }
                                    });
                                    this.handleChange(data);
                                }}
                            />
                            <ul>
                                {
                                    searchResult.map(recipe => (
                                        <SearchItem key={recipe._id} {...recipe} />
                                    ))}
                            </ul>
                        </div>)

                }
            </ApolloConsumer>
        )
    }
}



export default Search;