'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedido_plato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pedido_plato.init({
    idPedido: DataTypes.INTEGER,
    idPlato: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pedido_plato',
  });
  return pedido_plato;
};