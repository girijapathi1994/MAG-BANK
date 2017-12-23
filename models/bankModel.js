const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const config=require('../database/bankDatabase');


//customer Schema
const CustomerSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    }, username:{
        type:String,
        required:true
    }, password:{
        type:String,
        required:true
    }
});
//export that schema
const Customer=module.exports=mongoose.model('Customer',CustomerSchema);
//find customer by Id from schema
module.exports.getCustomerById=function(id,callback){
    Customer.findById(id,callback)
}
//find customer by name  from schema
module.exports.getCustomerByUsername = function(username, callback){
    const query = {username: username}
    Customer.findOne(query, callback);
  }
//to add new customer schema
  module.exports.addNewCustomer = function(newCustomer, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newCustomer.password, salt, (err, hash) => {
        if(err) throw err;
        newCustomer.password = hash;
        newCustomer.save(callback);
      });
    });
  }

  //to compare passwords
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }