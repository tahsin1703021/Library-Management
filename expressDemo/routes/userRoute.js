const express = require("express");
const path = require('path');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const User = new mongoose.model("User", userSchema);
const Admin = new mongoose.model("Admin", userSchema);
userRouter.get("/registeredUsers", (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error while getting all the books",
      });
    } else {
      res.send(data);
    }
  });
});


userRouter.post("/registeredUsers", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      user_name: req.body.name,
      password: hashedPassword,
      email: req.body.email
    });
    await newUser.save();
    res.status(200).json({
      message: "User was registered successfully",
    });
  } catch {
    res.status(500).json({
      message: "Sign Up Failed",
    });
  }
});

userRouter.post("/forgot-password", (req, res, next) => {
  const {email } = req.body;
  const user =  User.find({ email: req.body });
  if(!user){
    res.send('User not registered');
    return;
  }
  const secret =  process.env.JWT_SECRET + email;
  const payload = {
    email: email
  }
  const token = jwt.sign(payload,secret,{expiresIn: '5m'});
  const link = `http://localhost:3000/user/reset-password/${email}/${token}`;
  console.log(link);
  res.send('password reset link has been sent to your email...');
 
});

userRouter.get("/reset-password/:email/:token", (req,res,next) =>{
    const { email, token } = req.params;
    const user =  User.find({ email: email });
    if(!user){
      res.send('Invalid user email');
      return;
    }

    const secret =  process.env.JWT_SECRET + email;
    try{
      const payload = jwt.verify(token, secret);
      // res.render('reset-password.html', {email: email});
      res.sendFile(path.join(__dirname+'/reset-password.html'));

    }catch(error){
      console.log(error.message);
      res.send(error.message);
    }

});
userRouter.post("/reset-password/:email/:token", async (req,res,next) =>{
  const { email, token } = req.params;
  const password = req.body.password;
  const user =  User.find({ email: email });
  if(!user){
    res.send('Invalid user email');
    return;
  }
  const secret =  process.env.JWT_SECRET + email;
  try{
        const payload = jwt.verify(token, secret);
        const hashedPassword = await bcrypt.hash(password, 10);   
        User.findOneAndUpdate({email: email},{
          password: hashedPassword
        },function (err, docs){
          if(err){
            console.log(err);
          }else {
            console.log(docs);
            }
          }
        )
        res.send('Password Changed Successfully');

  }catch(error){
    
       res.send(error.message);
  }

});
userRouter.post("/login", async (req, res) => {
  try{
        const user = await User.find({ user_name: req.body.name });
        if (user && user.length > 0) {
          const isValidPassword = await bcrypt.compare(
            req.body.password,
            user[0].password
          );
          if (isValidPassword) {
            //generate token
            const token = jwt.sign(
              {
                user_name: user[0].user_name,
                userId: user[0]._id,
              },
              process.env.JWT_SECRET,{
                  expiresIn: '1h'
              }
            );
            res.status(200).json({
              "access_token": token,
              "message": "Login successful!"
          });

          } else {
            res.status(401).json({
              error: "Authetication failed1!",
            });
          }
        } else {
          res.status(401).json({
            error: "Authetication failed2!",
          });
        }
    }catch {
        res.status(401).json({
            "error": "Authetication failed0!"
        });
    }
});

userRouter.post("/adminLogin", async (req, res) => {
  try{
        const admin = await Admin.find({ user_name: req.body.name });
        if (admin && admin.length > 0) {
          const isValidPassword = await bcrypt.compare(
            req.body.password,
            admin[0].password
          );
          if (isValidPassword) {
            //generate token
            const token = jwt.sign(
              {
                user_name: admin[0].user_name,
                userId: admin[0]._id,
              },
              process.env.JWT_SECRET,{
                  expiresIn: '1h'
              }
            );
            res.status(200).json({
              "access_token": token,
              "message": "Login successful!"
          });

          } else {
            res.status(401).json({
              "message": "Authetication failed1!",
            });
          }
        } else {
          res.status(401).json({
            "message": "You are not a admin",
          });
        }
    }catch {
        res.status(401).json({
            "message": "Authetication failed0!"
        });
    }
});


module.exports = userRouter;
