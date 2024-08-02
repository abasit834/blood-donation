
const { Router } = require("express");
const donor = require("../Controllers/donorController");
const router = Router();

router.post("/addDonor", async (req, res) => {
    const formData = req.body;
    const { name, lastdonated, dob, bloodgroup, contact } = formData;

    try {
        await donor.addDonor(name, bloodgroup, dob, lastdonated, contact);
        res.sendStatus(200); 
    } catch (error) {
        console.error('Error submitting data:', error.message);
        res.status(500).send('Internal Server Error'); 
    }
});

// router.get("/retrieveDonors")

module.exports = router;