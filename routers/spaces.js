const { Router } = require("express");
const router = new Router();
const Space = require("../models/").space;

router.get("/", async (req, res) => {
  try {
    const getAllSpaces = await Space.findAll();

    res.status(201).json(getAllSpaces);
  } catch (error) {
    return res.status(400).send("Something went wrong, sorry");
  }
});
module.exports = router;
