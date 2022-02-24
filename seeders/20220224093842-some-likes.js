"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "likes",
      [
        {
          iduser: 1,
          idstory: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          iduser: 2,
          idstory: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("likes", null, {});
  },
};
