const { Router } = require("express");
const router = new Router();
const Space = require("../models/").space;
const Story = require("../models/").story;

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

module.exports = router;
