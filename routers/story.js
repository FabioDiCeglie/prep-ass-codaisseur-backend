const { Router } = require("express");
const router = new Router();
const Space = require("../models/").space;
const Story = require("../models/").story;
const Comment = require("../models").comment;
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
    const user = req.user;
    const findSpace = await Space.findOne({ where: { userId: user.id } });
    if (!findSpace) {
      res.status(404).send("space id not found");
    } else {
      const newStory = await Story.create({
        name,
        content,
        imageUrl,
        spaceId: findSpace.id,
      });
      res.status(200).send(newStory);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.get("/comments/:id", async (req, res) => {
  try {
    const spaceId = req.params.id;

    const story = await Space.findByPk(spaceId, {
      include: { model: Story, include: [Comment] },
    });
    //const getAllComments = await story.findAll();
    // where: { storyId: story.id },

    res.status(201).json(story);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong, sorry");
  }
});

router.post("/comments/create/:id", async (req, res) => {
  try {
    const storyId = req.params.id;
    const { email, comment } = req.body;

    const findTheStory = await Story.findByPk(storyId);

    if (!findTheStory) {
      res.status(404).send("Story not found");
    } else {
      const createComment = await Comment.create({
        email,
        comment,
        storyId: findTheStory.id,
      });
      res.status(201).json(createComment);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong, sorry");
  }
});

module.exports = router;
