const mongoose = require('mongoose');
const conn = mongoose.connect('mongodb://localhost:27017/mydb');

conn.then(() => {
    console.log(`Database connected Succesfully`)
})

conn.catch(() => {
    console.log(`Error connecting Database`)
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model('login', LoginSchema);
module.exports = collection;