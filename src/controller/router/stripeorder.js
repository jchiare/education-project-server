require("dotenv").config();
import express from "express";
import stripe_API from "stripe";

const stripe = stripe_API(process.env.TEST_STRIPE_SERVER_KEY);

const stripe_route = express.Router();

stripe_route.post("*", async (req, res) => {
  try {
    const response = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body.stripe_token
    });
    res.status(201).json(response);
  } catch (err) {
    //console.log(err);
    let message;
    switch (err.type) {
      case "StripeCardError":
        // A declined card error
        message = err.message; // => e.g. "Your card's expiration year is invalid."
        break;
      case "RateLimitError":
        // Too many requests made to the API too quickly
        message = "Internal issue, please try again once in a few minutes.";
        break;
      case "StripeInvalidRequestError":
        // Invalid parameters were supplied to Stripe's API
        message = "Internal issue, please message the developer";
        break;
      case "StripeAPIError":
        // An error occurred internally with Stripe's API
        message = "Vendor issue - please try again";
        break;
      case "StripeConnectionError":
        // Some kind of error occurred during the HTTPS communication
        message = "Internal issue, please try again once in a few minutes.";
        break;
      case "StripeAuthenticationError":
        // You probably used an incorrect API key
        message = "Contact Developer - API key issue";
        break;
      default:
        // Handle any other types of unexpected errors
        message = "Unknown error, contact the developer";
        break;
    }
    res.status(500).json({ error: message });
  }
});

export default stripe_route;
