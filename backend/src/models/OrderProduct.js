const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('OrderProduct', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, { timestamps: false });
};
