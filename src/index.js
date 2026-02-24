const express = require('express');
const path = require('path');
const Bcrypt = require('bcrypt');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

const port = 1500;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});