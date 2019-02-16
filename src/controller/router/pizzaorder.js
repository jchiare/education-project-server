import express from "express";
import { AddPizzaData } from "../.././models/data";
const pizza_route = express.Router();

pizza_route.post("*", async (req, res) => {
  try {
    const response = await AddPizzaData(req.body.values);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("hello");
  }
});

export default pizza_route;
