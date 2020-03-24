const express = require("express")
const app = express();
const PORT = process.env.PORT || 5000;
const router = express.Router();
const mongoose = require("mongoose");

const config = require("./config.json"); // Configuration Files Containes Connection Details With Database & Some Security KEYS

// For Security Purpose We never ever Store Passwords in Plain Text
const crypto = require("crypto");
const uuid = require("uuid");


// To Accept JSON
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const secret = config.SECRET_KEY;
function getHashPassword(plainPassword){
   return crypto.createHmac('sha256', secret)
                   .update(plainPassword)
                   .digest('hex');
}
const hash = getHashPassword('GoogleUser');
console.log(hash);



// Now Connecting to Database
mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("Connected to Database")
});



const ErrorMessageClass = require("./Models/ErrorMessage");

// Users Routes
var USERS = require("./Routes/Users");
app.use("/api/users",USERS);

app.get("/",(req,res)=>{
    console.log("Server Request Method in with GET '/' Method = "+req.secure)
    res.status(400).json(new ErrorMessageClass(400,"This API Request is Invalid"));
})
app.listen(PORT,function(){
    console.log("Node Server Started At PORT="+PORT);
})