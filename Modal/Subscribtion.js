const mongoose = require("mongoose")

const articalsSchema = mongoose.Schema({
    titel:{
        type:String,
        required:true,
    },
    
    imageUrl:{
        type:String,
        required:true,
    },
    
    content:{
        type:String,
        required:true,
    },
    
    access:{
        type:String,
        enum:["Basic" , "Standert" , "Premium"],
        required:true
    },
    
})

const Artical = mongoose.model("Articals" , articalsSchema)

module.exports = Artical