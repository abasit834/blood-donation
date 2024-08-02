const {Router} = require("express");
const donor = require("../Controllers/adminController");

const router = Router();


router.get("/admin-login",checkUser);


module.exports = router;


