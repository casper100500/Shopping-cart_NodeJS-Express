console.log(`Read products table`);
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/shopping')
var Schema = mongoose.Schema;
var schema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});
//console.log(`almost done`);
module.exports = mongoose.model('Product', schema)
//console.log(`Done`);
//mongoose.disconnect;



