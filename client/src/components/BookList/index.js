import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import Spinner from '../Spinner';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

class BookList extends Component {
    displayBooks() {
        let data = this.props.data;
        if (data.loading) {
            return <Spinner />;
        } else {
            return data.books.map(book => {
                return <li key={book.id}>{book.name}</li>;
            });
        }
    }

    render() {
        return (
            <div>
                <ul id='book-list'>{this.displayBooks()}</ul>
            </div>
        );
    }
}
export default graphql(getBooksQuery)(BookList);
