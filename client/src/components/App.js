import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//component imports
import BookList from './BookList';
import AddBook from './AddBook';

//apollo client set up
const client = new ApolloClient({
    //proxy in package.json to the server, so only the path is needed
    uri: '/graphql'
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className='container mt-4'>
                    <div id='main' className='jumbotron '>
                        <h1>Reading List</h1>
                        <BookList />
                        <AddBook />
                    </div>
                </div>
            </ApolloProvider>
        );
    }
}
export default App;
