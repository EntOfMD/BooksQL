import React, { Component } from 'react';
import BookList from './BookList';

class App extends Component {
    render() {
        return (
            <div id='main' className='jumbotron jumbotron-fluid'>
                <h1>Reading List</h1>
                <BookList />
            </div>
        );
    }
}
export default App;
