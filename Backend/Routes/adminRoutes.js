const {Router} = require("express");
const donor = require("../Controllers/adminController");

const router = Router();


router.post("/login",donor.checkUser);


module.exports = router;


