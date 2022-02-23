const { Router } = require("express");
const router = new Router();
const Space = require("../models/").space;
const Story = require("../models/").story;
const authMiddleware = require("../auth/middleware");

router.delete("/:id", async (req, res, next) => {
  try {
    const storyId = req.params.id;

    const story = await Story.findByPk(storyId);

    if (!story) {
      return res.status(404).send(`Story ID ${story} not found!`);
    } else {
      const deleteStory = await story.destroy();
      res.status(200).send(deleteStory);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/create", authMiddleware, async (req, res, next) => {
  try {
    console.log("request body", req.body);
    const { name, content, imageUrl } = req.body;
    if (!name || !content || !imageUrl) {
      return res
        .status(400)
        .send("Please provide a name, content and imageUrl");
    }
    const story = await Story.create({
      name,
      content,
      imageUrl,
    });
    if (!story) {
      return res.status(404).send(`Can't create the story`);
    }
    res.status(200).send(story);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
