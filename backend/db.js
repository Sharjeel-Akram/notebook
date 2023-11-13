const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect("mongodb://127.0.0.1/notebook")
        .then(() => {
            console.log('Connected to MongoDB successfully');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
};
module.exports = connectToMongo;