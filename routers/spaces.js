const { default: Axios } = require("axios");
const { Router } = require("express");
const router = new Router();
const Space = require("../models/").space;
const Story = require("../models/").story;
const authMiddleware = require("../auth/middleware");

router.get("/spaces", async (req, res) => {
  try {
    const getAllSpaces = await Space.findAll();

    res.status(201).json(getAllSpaces);
  } catch (error) {
    console.log(error);
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
router.patch("/spaces/update/:id", authMiddleware, async (req, res) => {
  try {
    const spaceId = req.params.id;
    const { title, description, backgroundColor, color } = req.body;

    const getSpaceById = await Space.findByPk(spaceId);
    if (!getSpaceById) {
      res.status(400).send("This is not correct");
    } else {
      const updateSpace = await getSpaceById.update({
        title,
        description,
        backgroundColor,
        color,
      });
      res.status(200).send(updateSpace);
    }
  } catch (erro) {
    return res.status(400).send("The id is not correct!");
  }
});

module.exports = router;
