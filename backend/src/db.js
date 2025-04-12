require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category,Product,User, Cart,Order,OrderProduct } = sequelize.models;

// Aca vendrian las relaciones
Product.belongsToMany(Category, { through: "ProductCategory", as: "Categories" });
Category.belongsToMany(Product, { through: "ProductCategory" });

// Relación One-to-Many entre Usuario y Productos
User.hasMany(Product, { foreignKey: "userId", as: "products" });
Product.belongsTo(User, { foreignKey: "userId", as: "owner" });

Cart.belongsTo(User, { through: "ProductCart", as: "CarritoUser" });
Cart.belongsTo(Product,{ through: "ProductCart", as: "CarritoProduct" });

// Un Usuario tiene muchas Ordenes
User.hasMany(Order);
Order.belongsTo(User);
// Order <-> Product (muchos a muchos con tabla intermedia)
// Una Orden tiene muchos Productos a través de OrderProduct
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId'});
Product.belongsToMany(Order, { through: OrderProduct,  foreignKey: 'productId' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
