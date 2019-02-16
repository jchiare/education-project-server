import express from "express";
const dev_route = express.Router();

const cached_payload = {
  old: "nothing here"
};

const cachePayload = elem => {
  if (cached_payload.new) {
    cached_payload.old = cached_payload.new;
  }
  cached_payload.new = elem;
  return cached_payload;
};

dev_route.post("*", async (req, res, next) => {
  cachePayload(req.body);
  next();
});

dev_route.get("/dev", async (req, res) => {
  res.send(JSON.stringify(cached_payload));
});

export default dev_route;
