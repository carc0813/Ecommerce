const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    inStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    sizes: {
      type: DataTypes.ARRAY(DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL')),
      defaultValue: []
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    gender: {
      type: DataTypes.ENUM('men', 'women', 'kid', 'unisex'),
      allowNull: false
    },
    images: { 
      type: DataTypes.ARRAY(DataTypes.STRING), // Almacenar como array de strings
      allowNull: false 
  },
  }, { timestamps: false });

};


