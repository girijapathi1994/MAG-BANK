const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Customer=require('../models/bankModel');
const config=require('../database/bankDatabase');

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
     
    Customer.getCustomerById(jwt_payload._id, (err, customer) => {
      if(err){
        return done(err, false);
      }

      if(customer){
        return done(null, customer);
      } else {
        return done(null, false);
      }
    });
  }));
}
