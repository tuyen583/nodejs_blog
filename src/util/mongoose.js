const { mongo } = require("mongoose");

module.exports = {
    mutipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map(mongoose => mongoose.toObject());
    },
    mongoleMongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
} 