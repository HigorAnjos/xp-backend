const Product = (sequelize, DataTypes) => {
  const schemaProduct = sequelize.define("Product", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER
  }, {
    tableName: 'Products',
    modelName: 'Product',
    timestamps: true, // true by default
  });

  return schemaProduct;
};

module.exports = Product;
