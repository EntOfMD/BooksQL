const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/BooksQL',
    {
        useCreateIndex: true,
        useNewUrlParser: true
    },
    err => {
        if (err) throw err;
    }
);
mongoose.connection.once('open', () => {
    console.log(`Database is online & connected`);
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
