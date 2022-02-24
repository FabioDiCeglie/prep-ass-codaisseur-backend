const { default: Axios } = require("axios");
const { Router } = require("express");
const router = new Router();
const Space = require("../models/").space;
const Story = require("../models/").story;
const User = require("../models").user;
const Like = require("../models").likes;
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

    //const getSpaceById = await Space.findByPk(spaceId, { include: [Story] });

    const getSpaceById = await Space.findByPk(spaceId, {
      include: { model: Story, include: [{ model: User, as: "storyLikes" }] },
    });

    res.status(200).send(getSpaceById);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send("The id is not correct!");
  }
});
router.post("/like/story/:id", authMiddleware, async (req, res) => {
  try {
    const storyId = req.params.id;
    const user = req.user;

    const getStoryById = await Story.findByPk(storyId);
    if (!getStoryById) {
      res.status(400).send("Id not found!");
    } else {
      const createNewLikes = await Like.create({
        idstory: storyId,
        iduser: user.id,
      });
      res.status(200).send(createNewLikes);
      console.log("what is create", createNewLikes);
    }
  } catch (error) {
    console.log(error.message);
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
