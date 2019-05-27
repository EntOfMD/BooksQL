const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//defining a type and what to return
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
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
            args: { id: { type: GraphQLString } }, //adding ID as a param so we can grab individuals
            resolve(parent, args) {
                //code to get data from db/other source
            }
        }
    }
});

//defining which query we're allowing user to use when they're making from the front-end
module.exports = new GraphQLSchema({
    query: RootQuery
});
