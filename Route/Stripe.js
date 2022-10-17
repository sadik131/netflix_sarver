const express = require("express");
const Artical = require("../Modal/Subscribtion");
const Users = require("../Modal/User");
const router = express.Router()
const stripe = require('stripe')('sk_test_51LUCGZD7eWHrhZlqeeKHzRcmdbnZARZvbJDt1gQyn9pVNqbwfZs94tsmrg2TlvZXkjGUaLz5KeL4C8zGrM7ab8V900UvZWBFZk');

router.get("/user/:email", async (req, res) => {
    try {
        const { email } = req.params
        console.log(req ,"req")
        const user = await Users.find({ email:email })

        const stripeId = user[0].StripeCustomerId
        
        const subscription = await stripe.subscriptions.list({
            customer : stripeId,
            status: "all",
            expand:["data.default_payment_method"]
            
        },{
            apiKey: process.env.stripe_secret
        })

        if(!subscription.data.length) return res.json([])

        
        const plan = subscription.data[0].plan.nickname
        // console.log(subscription)

        if(plan == "Basic"){
            const articals = await Artical.find({access: "Basic"})
            return res.json(articals)
        }
        if(plan == "Standert"){
            const articals = await Artical.find({access:{$in:["Basic" ,"Standert"]}})
            return res.json(articals)
        }
        if(plan == "Premium"){
            const articals = await Artical.find({})
            return res.json(articals)
        }

        res.status(200).json({
            status:"Success",
            result: subscription
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/price", async (req, res) => {
    const price = await stripe.prices.list({
        apiKey: process.env.stripe_secret
    })
    // console.log(price,"Price stripe")
    res.status(200).json({
        price
    })
});

router.post("/sessions", async (req, res) => {
    const { email } = req.body
    const priceId = req.body.price
    const user = await Users.findOne({ email })
    const price = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{
            price: priceId,
            quantity: 1,
        }],
        success_url: "http://localhost:3000/primiam",
        cancel_url: "http://localhost:3000",
        customer: user.StripeCustomerId

    }
        , {
            apiKey: process.env.stripe_secret
        })
        // console.log(price)
    res.send(price)
})

module.exports = router
