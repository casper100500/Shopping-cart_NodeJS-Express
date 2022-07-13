console.log(`Use users table`);
var mongoose= require('mongoose')
var Schema=  mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    passwordOPEN: {type: String, required: true},
});

//to encrypt Password (Used in SignUP)
userSchema.methods.encryptPassword = function(password){
    console.log('encrypting Password')
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}
d=0
//to decrypt Password (Used in LogIn)
userSchema.methods.validPassword=function(password){
    d++
    console.log(d+'decrypting Password')
    return bcrypt.compareSync(password,this.password)
};

module.exports = mongoose.model('User', userSchema);