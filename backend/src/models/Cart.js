const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
     sequelize.define("Cart", {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },{ timestamps: false });
};
 