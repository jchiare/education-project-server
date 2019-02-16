import express from "express";
import { AddPizzaData } from "../.././models/data";
const pizza_route = express.Router();

pizza_route.post("*", async (req, res) => {
  try {
    const response = await AddPizzaData(req.body.values);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default pizza_route;
