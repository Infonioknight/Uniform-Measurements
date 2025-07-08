const mongoose = require("mongoose");

const databaseConnection = () => {
    mongoose.connect("mongodb+srv://gpremp7736:GameGame@cluster0.y56rpua.mongodb.net/Real-problem-on-Size", {
    // mongoose.connect("mongodb+srv://gpremp7736:GameGame@cluster0.y56rpua.mongodb.net/test-Real-problem-on-Size", {
        autoIndex: true,
    })
        .then(() => {
            console.log('MongoDB is connected on 27017')
        })
        .catch((err) => {
            console.log(err)
        })
};

module.exports = databaseConnection;