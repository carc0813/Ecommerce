const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
     name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        role: {
        type: DataTypes.ENUM("admin", "user"), // Puedes agregar más roles según necesidades
        allowNull: false,
        defaultValue: "user",
      },
    },
    { timestamps: false });
};
    
  