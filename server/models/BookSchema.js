const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;
const _ = require('lodash');

//dummy data
const books = [
    {
        name: 'The Silmarillion',
        genre: 'Fastasy',
        id: '1',
        authorId: '1'
    },
    {
        name: 'A Game of Thrones (A Song of Ice and Fire, Book 1)',
        genre: 'Fantasy',
        id: '2',
        authorId: '2'
    },
    {
        name: 'Harry Potter and the Chamber of Secrets',
        genre: 'Fantasy',
        id: '3',
        authorId: '3'
    },
    {
        name: 'The Lord of the Rings',
        genre: 'Fantasy',
        id: '4 ',
        authorId: '1'
    }
];

const authors = [
    { name: 'J.R.R Tolkien', age: 81, id: '1' },
    { name: 'George R. R. Martin', age: 70, id: '2' },
    { name: 'J.K. Rowling', age: 53, id: '3' }
];

//defining a type and what to return
const BookType = new GraphQLObjectType({
    name: 'Book',
    //when wrapping in fx, it's not executing the function until it's called.
    //otherwise, it'll have lexical error
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

//how we initially jump into the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    //options of how to initially jump into the graph
    fields: {
        //when book is queried, so and grab it
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } }, //adding ID as a param so we can grab individuals
            resolve(parent, args) {
                //code to get data from db/other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } }, //adding ID as a param so we can grab individuals
            resolve(parent, args) {
                //code to get data from db/other source
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

//defining which query we're allowing user to use when they're making from the front-end
module.exports = new GraphQLSchema({
    query: RootQuery
});
