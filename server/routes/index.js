const router = require('express').Router();
const graphqlHTTP = require('express-graphql');
const { BookSchema } = require('../models');

router.use('/graphql', graphqlHTTP({ schema: BookSchema, graphiql: true }));

module.exports = router;
