const router = require('express').Router();
const graphqlHTTP = require('express-graphql');

router.use('/graphql', graphqlHTTP({}));

module.exports = router;
