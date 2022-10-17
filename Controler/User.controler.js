const Artical = require("../Modal/Subscribtion")
const Users = require("../Modal/User")
const stripe = require('stripe')('sk_test_51LUCGZD7eWHrhZlqeeKHzRcmdbnZARZvbJDt1gQyn9pVNqbwfZs94tsmrg2TlvZXkjGUaLz5KeL4C8zGrM7ab8V900UvZWBFZk');
// console.log(stripe)

exports.getArtical = async (req, res, next) => {
    try {
        const result = await Artical.find({})
        res.status(200).json({
            result
        })

    } catch (error) {
        console.log(error)
    }
}


exports.loginUser = async (req, res, next) => {
    try {
        const user = req.body.email
        const exist = await Users.find({ email: user })
        const condition = exist.length      // conddition to exist the user
        if (condition) {
            return res.status(400).json({
                status: "fail",
                message: "All ready exist the user"
            })
        } else {
            const customer = await stripe.customers.create({
                email:user
            },{
                apiKey: process.env.stripe_secret
            })
            // console.log(customer,"customer")
            console.log(user , "user")
            const result = await Users.create({
                email:user,
                StripeCustomerId:customer.id
            })
            res.status(200).json({
                status: 'Success',
                message: "User Add Successfully",
                data: result,
                StripeCustomerId: customer.id
            })
        }

    } catch (error) {
        console.log(error)
    }
}