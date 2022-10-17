const express = require('express');
const app = express()
const cors = require('cors');

const port = process.env.PORT || 5000

// medile wars

app.use(express.json())
app.use(cors())

// route
const user = require("./Route/User.Route")
const stripe = require("./Route/Stripe")

app.use("/api/v1", user)
app.use("/api/v1", stripe)

app.use("/" ,(req , res) =>{
    res.send("Sarver is running")
})


module.exports = app ;
