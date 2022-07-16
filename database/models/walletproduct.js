const WalletProduct = (sequelize, DataTypes) => {

  const schemaWalletProduct = sequelize.define('PostCategory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Wallets',
        key: 'id'
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      },
    },
    salePrice: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    tableName: 'PostCategories',
    modelName: 'WalletProduct',
    timestamps: true, // true by default
  });

  schemaWalletProduct.associate = (models) => {
    schemaWalletProduct.belongsTo(models.Wallet, {
      otherKey: 'walletId',
      as: 'products',
      through: 'WalletProducts',
      foreignKey: 'productId',

    });
    schemaWalletProduct.belongsTo(models.Product, {
      otherKey: 'productId',
      as: 'wallets',
      through: 'WalletProducts',
      foreignKey: 'walletId',
    });
  };

  return schemaWalletProduct;
};

module.exports = WalletProduct;
