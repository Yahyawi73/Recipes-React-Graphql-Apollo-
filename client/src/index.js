import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './index.css';
import App from './component/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SignIn from './component/Auth/signIn';
import SignUp from './component/Auth/signUP';
import withSession from './component/session/withSession';
import NavBar from './component/NavBar';
import Search from './component/Recipe/Search';
import AddRecipe from './component/Recipe/AddRecipe';
import Profile from './component/Profile/Profile';
import RecipePage from './component/Recipe/RecipePage'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network', networkError)
    }
  }
})

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <NavBar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
        <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
        <Route path="/Search" component={Search} />
        <Route path='/recipe/add' render={() => <AddRecipe session={session} />} />
        <Route path='/recipe/:_id' component={RecipePage} />
        <Route path='/profile' render={() => <Profile session={session} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
)

const RootWithSession = withSession(Root);

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));
