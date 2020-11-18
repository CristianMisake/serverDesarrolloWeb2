'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categorias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.bulkInsert('categorias', [
      { nombre: 'comida rapida', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'comida mexicana', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'comida colombiana', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'comida tradicional', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categorias');
  }
};