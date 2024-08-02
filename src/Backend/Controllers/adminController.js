const db = require("../Models/adminModel");

exports.checkUser = async ()=> {
    const {username,password} =  req.body;

    try{
         
        await db.findOne({
            email : username,
            password : password
        })
        console.log("Login Successfull");

    }catch(err){
        console.log(err);
    }

}