const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe =require("stripe")("sk_test_51J7fZfBb4ifIx1lICfDNL6WZMea4ta7SO22ds7KIcxqWxiirnohFEI2xqJw8AvO3vW9RWuMZOU0MqkXdFYnyuu9u00fIKfDlrF");

// -app

// -app config

const app = express();

// -middleware

app.use(cors({origin: true}));
app.use(express.json());

// -API routes

app.get("/", (req, res)=>{
  res.status(200).send("Hello world");
});
app.post("/payments/create",async (req, res)=>{
    const total = req.query.total;
    console.log(total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

})
// -listen command
exports.api = functions.https.onRequest(app);
