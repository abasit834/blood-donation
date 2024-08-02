const donor=require('../Models/donorsModel');

const addDonor=async(name,bg,dob,ld,cn)=>{
    const add=new donor;
    add.name=name;
    add.bloodgroup=bg;
    add.dateofbirth=dob;
    add.contactNumber=cn;
    add.lastDonated=ld;

    await add.save();

    return add;
}

const retrieveDonor=async(bg)=>{
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    let blood = await donor.find({
        bloodgroup : bg,
        lastDonated : { $lt: threeMonthsAgo }
    })

    return blood;

}





module.exports.addDonor=addDonor;
module.exports.retrieveDonor=retrieveDonor;