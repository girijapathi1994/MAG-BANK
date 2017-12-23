const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const cors=require("cors");
const passport=require("passport");
const mongoose=require("mongoose");
//read db file from external file
const config=require('./database/bankDatabase');
//connect to db
mongoose.connect(config.database,{ useMongoClient: true });
//on connected
mongoose.Promise = global.Promise;
mongoose.connection.on('connected',()=>{
    console.log('connected to database '+config.database)
});
//on error
mongoose.connection.on('error',(err)=>{
    console.log('error to database'+err)
});



const app=express();
//all routes
const banks=require('./bankRoutes/bankRoutes');


//to add portfor local
const port=3000;
//port for heroku deployment
//const port=process.env.PORT||8080;

//allow cross origin requests
app.use(cors());
//add static folder for clientcode
app.use(express.static(path.join(__dirname,'bankClient')));

//body parser middleware
app.use(bodyParser.json());
//pass all routes to bank
app.use('/banks',banks);
//passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());
//include passport.js file
require('./database/passport')(passport);

//to add one route or url
app.get('/',(req,res)=>{
    res.send("Invalid end point for MAG bank");

});
//pass all routes to index.html
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'bankClient/index.html'));
});


//tolisten port
app.listen(port,()=>{
    console.log("server started on port"+port)
});
