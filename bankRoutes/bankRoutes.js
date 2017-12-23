const express=require("express");
const router=express.Router();
//add required ones like passport
const passport=require("passport");
const jwt=require("jsonwebtoken");

const bcrypt=require("bcryptjs");
//to load model
const Customer=require('../models/bankModel');
//to load database
const config=require('../database/bankDatabase');
//for routing register
router.post('/register',(req,res,next)=>{
    let newCustomer=new Customer({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    })
    
//addnew customer
Customer.addNewCustomer(newCustomer,(err,customer)=>{
        if(err){
            res.json({success:false,msg:'failed to save'})
        }else{
         res.json({success:true,msg:'customer registered'})
         
        }
       
    })
})

//routing for authenticate
router.post('/authenticate',(req,res,next)=>{
    debugger;
    const username = req.body.username;
    const password = req.body.password;
  //check from  model by username
    Customer.getCustomerByUsername(username, (err, customer) => {
      if(err) throw err;
      if(!customer){
        return res.json({success: false, msg: 'Customer not found'});
      }
  //if found comapre passwords
      Customer.comparePassword(password, customer.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
            //customer.toJSON() is must
          const token = jwt.sign(customer.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
          });
  //we can return any data in response
          res.json({
            success: true,
            token: 'JWT '+token,
            //in authentication we are no longer needed to return user details.
            /*customer: {
              id: customer._id,
              name: customer.name,
              username: customer.username,
              email: customer.email
            }*/
          });
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
})


// Profile  authorize routes with jwt token
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

//to export all routes.
module.exports=router;