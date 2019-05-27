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

const Author = require('../author');
const Book = require('../book');

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
                // return _.find(authors, { id: parent.authorId });
                return Author.findById(parent.authorId);
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
                // return _.filter(books, { authorId: parent.id });
                return Book.find({ authorId: parent.id });
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
                // return _.find(books, { id: args.id });
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } }, //adding ID as a param so we can grab individuals
            resolve(parent, args) {
                //code to get data from db/other source
                // return _.find(authors, { id: args.id });
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                {
                    let book = new Book({
                        name: args.name,
                        genre: args.genre,
                        authorId: args.authorId
                    });
                    return book.save();
                }
            }
        }
    }
});

//defining which query we're allowing user to use when they're making from the front-end
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
