"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "Fabio space",
          description: "This is Fabio space",
          backgroundColor: "#C63819",
          color: "#1936C6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Milton space",
          description: "This is Milton space",
          backgroundColor: "#50C619",
          color: "#C61919",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Andrea space",
          description: "This is Andrea space",
          backgroundColor: "#1936C6",
          color: "#C6197F",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
