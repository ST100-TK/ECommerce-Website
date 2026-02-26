const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/Ecommerce');

connect.then(() =>{
    console.log("Connected to the database successfully");
})
.catch(() => {
    console.log("Error connecting to the database");
});

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("Users", LoginSchema);

module.exports = collection;