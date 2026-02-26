const express = require('express');
const path = require('path');
const Bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

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