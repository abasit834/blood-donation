const express=require("express");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');


const app=express();
const PORT = 3005;
app.use(cors());
app.use(bodyParser.json()); 

mongoose.connect('mongodb+srv://ab1438068:blbNfM3WuYgaMs1I@blood-donation.oziifdb.mongodb.net/?retryWrites=true&w=majority&appName=blood-donation'
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{ 
    console.log('MongoDB connected')
})
.catch(err => console.log(err));

app.use("/donors",require("./Routes/donorRoutes"));


app.listen(PORT,()=>{
    console.log(`Server running at: ${PORT}`);
})