
// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);

// App config

const app = express();

// Middle ware


app.use(cors({origin: true}));
app.use(express.json());

// Api rouets

app.get("/", (req, res)=> res.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) =>{
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  // Ok - created

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// baseurl ="http://127.0.0.1:5001/clone-3f147/us-central1/api"


// listen command
exports.api = functions.https.onRequest(app);
