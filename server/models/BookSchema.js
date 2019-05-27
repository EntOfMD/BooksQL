const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;
const _ = require('lodash');

//dummy data
const books = [
    { name: 'book 1', genre: 'xxx', id: '1', authorId: '1' },
    { name: 'book 2', genre: 'yyy', id: '2', authorId: '2' },
    { name: 'book 3', genre: 'zzz', id: '3', authorId: '3' },
    { name: 'book 4', genre: 'xxx', id: '4 ', authorId: '1' }
];

const authors = [
    { name: 'Author 1', age: 22, id: '1' },
    { name: 'Author 3', age: 24, id: '2' },
    { name: 'Author 2', age: 25, id: '3' }
];

//defining a type and what to return
const BookType = new GraphQLObjectType({
    name: 'Book',
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
        age: { type: GraphQLInt }
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
        }
    }
});

//defining which query we're allowing user to use when they're making from the front-end
module.exports = new GraphQLSchema({
    query: RootQuery
});
