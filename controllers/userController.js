const User = require("../models/userModel");
const bycryptjs = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const generate_token = async (id) => {
   
    try {
        const token = await jwt.sign({_id:id},config.jwt_token);
        return token;
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const securePassword = async (password) =>{

    try {
        
        const passwordHash = await bycryptjs.hash(password,10);
        return passwordHash;
    } catch (error) {
        res.status(400).send(error.message);
    }

}

const register_user = async(req, res)=>{

    try{

        const sPassword = await securePassword(req.body.password);

        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:sPassword,
            image:req.file.filename,
            phone:req.body.phone,
            type:req.body.type,
        });

        const userData = await User.findOne({email:req.body.email});

        if(userData){
            res.status(200).send({success:true, msg:"This email is already exits."})
        } 
        else {
            const user_data = await user.save();
            res.status(200).send({success:true, data:user_data})
        }


    }catch (error){
        
        res.status(400).send(error.message);
    }
}

// Login Methods 


const user_login = async(req, res)=> {

    try {
        const email = req.body.email;
        const password = req.body.password;

       const userData = await User.findOne({email:email});  

        if(userData) {
          const passwordMatch =  await bycryptjs.compare(password, userData.password);

          if(passwordMatch) {
            const tokenData = await generate_token(userData._id);
                const userResult = {
                    _id:userData._id,
                    name:userData.name,
                    email:userData.email,
                    password:userData.password,
                    image:userData.image,
                    phone:userData.phone,
                    type:userData.type,
                    token:tokenData
                }
                const response = {
                    success:true,
                    msg:"User Details",
                    data:userResult
                }
                res.status(200).send(response);
          }
          else {
            res.status(200).send({success:false, msg: "Login Details are incorrect"})
          }
        }
        else {
            res.status(200).send({success:false, msg: "Login Details are not valid"})
        }
       
        
    } catch (error) {

        res.status(400).send(error.message);  
    }
}

const update_password = async (req, res)=> {

    try {
        const user_id = req.body.user_id;
        const password = req.body.password;

        if(user_id === "" && password === "") {

            res.status(200).send({success:false, msg: "User id and passsword is missing ?"})
        }

        const data = await User.findOne({_id:user_id}); 
        if(data){
                const newPassword = await securePassword(password);

                const userData = await User.findByIdAndUpdate({_id:user_id}, { $set:{
                    password:newPassword
                }});

                res.status(200).send({
                    success:true, 
                    msg:"your password has been updated successfully",
                });
        }
        else {
            res.status(200).send({success:false, msg:"User Id not found"})
        }

    } catch (error) {
        res.status(400).send(error.message);
    }

}
module.exports = {
    register_user,
    user_login,
    update_password
}