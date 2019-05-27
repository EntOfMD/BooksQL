import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

class AddBook extends Component {
    displayAuthors() {
        let data = this.props.data;
        if (data.loading) {
            return 'Loading...';
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                );
            });
        }
    }
    render() {
        return (
            <form className='card p-4 m-2'>
                <div className='form-row'>
                    <div className='col-md field'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Book Name'
                            autoComplete='off'
                        />
                    </div>
                    <div className='col-md field'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Genre'
                            autoComplete='off'
                        />
                    </div>
                    <div className='col-md field'>
                        <select className='custom-select'>
                            <option defaultValue>Select Author</option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <button className='btn btn-success rounded'>+</button>
                </div>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
