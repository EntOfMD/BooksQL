import React, { Component } from 'react';
import BookList from './BookList';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
//apollo client set up

const client = new ApolloClient({
    //proxy in package.json to the server, so only the path is needed
    uri: '/graphql'
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div id='main' className='jumbotron jumbotron-fluid'>
                    <h1>Reading List</h1>
                    <BookList />
                </div>
            </ApolloProvider>
        );
    }
}
export default App;
