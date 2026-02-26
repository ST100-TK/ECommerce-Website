const express = require('express');
const path = require('path');
const Bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.post('/signup', async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
    }

    const existingUser = await collection.findOne({ username: data.username });

    if(existingUser) {
        res.send('Username already exists. Please choose a different username.');
    }else{
        const saltRounds = 10;
        const hashedPassword = await Bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata)
    }

});

app.post('/login', async (req, res) => {
    try{
        const check = await collection.findOne({ username: req.body.username });
        if(!check){
            res.send('Invalid username');
       }

        const passwordMatch = await Bcrypt.compare(req.body.password, check.password);
        if(passwordMatch){
            res.redirect('/home');
        }else{
            res.send('Invalid password');
        }
    }catch{
        res.send("Wrong Details");
    }   

});

const port = 1500;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});