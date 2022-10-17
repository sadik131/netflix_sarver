const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
 
const app = require('./sarver');
 
// data base connection
mongoose.connect(process.env.Database).then(() =>{
    console.log(`DataBase connect successfully`)
})
 
// sarver
 
const port = process.env.PORT || 5000 ;
 
app.listen(port , () =>{
    console.log(`App is running on port ${port}`)
})
