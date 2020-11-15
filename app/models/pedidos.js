'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pedidos.init({
    valorTotal: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pedidos',
  });
  return pedidos;
};