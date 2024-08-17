const db = require("../Models/adminModel");

exports.checkUser = async (req,res) => {
    const {username,password} =  req.body;

    try{
        const admin = await db.findOne({
            username : username,
            password : password
        })

        if(!admin){
            console.log("User does not exist");
            res.status(404).json("User does not exist");
            return;
        }

        console.log("Login Successfull");
        res.status(200).json("Logged in successfully!");

    }catch(err){
        console.log(err);
    }

}