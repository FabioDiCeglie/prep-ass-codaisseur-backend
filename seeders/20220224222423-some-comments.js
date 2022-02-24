"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          email: "fabio@gmail.com",
          comment: "Wow great story",
          storyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "ciao@hotmail.com",
          comment: "not bad story",
          storyId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
