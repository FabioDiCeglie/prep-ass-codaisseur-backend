const { default: Axios } = require("axios");
const { Router } = require("express");
const router = new Router();
const Space = require("../models/").space;
const Story = require("../models/").story;

router.get("/spaces", async (req, res) => {
  try {
    const getAllSpaces = await Space.findAll();

    res.status(201).json(getAllSpaces);
  } catch (error) {
    return res.status(400).send("Something went wrong, sorry");
  }
});

router.get("/spaces/:id", async (req, res) => {
  try {
    const spaceId = req.params.id;

    const getSpaceById = await Space.findByPk(spaceId, { include: [Story] });
    res.status(200).send(getSpaceById);
  } catch (erro) {
    return res.status(400).send("The id is not correct!");
  }
});

module.exports = router;
