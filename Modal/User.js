const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    StripeCustomerId:String
})

// usersSchema.pre("find" ,(req , res) =>{
//     console.log(req)
// })

const Users = mongoose.model("Users" , usersSchema)

module.exports = Users