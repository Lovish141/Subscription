import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import UserModel from './User';
const app=express();


const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true   
        }
    }

)
 

const UserModel=mongoose.model("users",userSchema);

app.use(express.json());
app.use(cors());

const PORT=process.env.PORT || 5000;

mongoose.connect("mongodb+srv://Lovish:Lovish1234@userdatabase.upw8vgw.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{app.listen(PORT,()=>{console.log(`Server running at ${PORT}`)})})
.catch((error)=>{console.log(error.message)});

app.post('/signUp',(req,res)=>{
UserModel.create(req.body)
.then((users)=>{res.json(users)})
.catch(err=>res.json(err))
})

app.post('/login',(req,res)=>{
    console.log(req)
    const {email,password}=req.body;

    UserModel.findOne({email:email})
    .then((user)=>{
        if(user){
            if(user.password===password){
                res.json("Success");
            }else{
                res.json('The password is incorrect');
            }
        }else{
            res.json("No User Registered")
        }
    })
})


