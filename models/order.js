//Created by NG
console.log(`Use orders table`);
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    OrderCart: {type: Object, required: true},
    User:{type: String, required: true},
    PaymentID:{type: String, required: true},
    PaymentStatus:{type: String, required: true},
    SessionID:{type: String, required: false}
    
});

module.exports = mongoose.model('Order', schema) //JSON -> mongodb
