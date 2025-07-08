const mongoose = require("mongoose");

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('MongoDB is connected on 27017')
        })
        .catch((err) => {
            console.log(err)
        })
};

module.exports = databaseConnection;