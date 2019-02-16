require("dotenv").config();
import express from "express";
import pizza_route from "./controller/router/pizzaorder";
import stripe_route from "./controller/router/stripeorder";
import dev_route from "./controller/router/development";

const app = express();
const port = 9000;

app.use(require("body-parser").json());

// If server is ran in dev mode
// capture lastest 2 POST HTTP requests sent to this server
// and display at url/dev
if (__DEV__) {
  console.log("You are running in development mode");
  app.use("/", dev_route);
}

// Stripe payments API endpoint
app.use("/charge", stripe_route);

// Pizza order API endpoint
app.use("/pizzaorder", pizza_route);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
