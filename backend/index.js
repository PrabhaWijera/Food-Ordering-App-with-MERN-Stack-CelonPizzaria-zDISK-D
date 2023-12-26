const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


//user api sectionS

const app = express();
app.use(cors()); //cors middleware
app.use(express.json({ limit: "10mb" })); //body parser middleware

const PORT = process.env.PORT || 8080;

//mongo db connection

console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Conncted to Database"))
  .catch((error) => console.log(error.message));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },

  password: String,
  conformPassword: String,
  image: String,
});
// model

const UserModel = mongoose.model("users", userSchema);

app.get("/", (req, res) => {
  res.send("Hello World Server is Running .......");
});

// sign in api
app.post("/signin", async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  UserModel.findOne({ email: email }, (err, result) => {
    console.log(result);
    console.log(err);

    if (result) {
      res.send({ message: "email id is Already registered", alert: false });
    } else {
      const data = UserModel(req.body);
      const save = data.save();
      res.send({
        message: "User Registered Successfully",
        status: "success",
        alert: true,
      });
    }
  });
});

//api login
 app.post("/login",(req,res)=>{
    console.log(req.body);
     const {email}= req.body;

     UserModel.findOne({email:email},(er,result)=>{
        if(result){
         
            const dataSend={
                _id: result._id,
                    firstName: result.firstName,
                     lastName: result.lastName,
                     email: result.email,
                     image:result.image,
            }
            //get back end data from mongo db and send to front end set to front end
            console.log(dataSend);
            res.send({message: "Login Successfully",status:"success",alert:true, data:dataSend})
        }else{
            res.send({message: "This Email is not Available pleace Sign In....",status:"success",alert:false})
        }
     })
 })



//product section api
const schemaProduct=mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: Number,
  description: String,
});

const productModel=mongoose.model("products",schemaProduct);

// save the product in mongoose
app.post("/uploadProduct",async(req,res)=>{
  console.log(req.body);

  //use mongoos save method
  const data= await productModel(req.body);
  const dataSave= await data.save();


  res.send({message:"Product Data Received Successfully"})


})

// get all products from mongo db

app.get("/product", async (req,res)=>{

// get all data in db 1 step
const data= await productModel.find({})
res.send(JSON.stringify(data));

 
})






//server runningn port
app.listen(PORT, () => console.log("Server is running on port : " + PORT));
