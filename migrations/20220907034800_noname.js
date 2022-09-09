const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "costs_ads", deps: []
 *
 */

const info = {
  revision: 1,
  name: "noname",
  created: "2022-09-07T03:48:00.929Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "costs_ads",
      {
        adId: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "ad_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        adName: {
          type: Sequelize.STRING(255),
          field: "ad_name",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: true,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: "deleted_at",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["costs_ads", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
