const Wallet = (sequelize, DataTypes) => {
  const schemaWallet = sequelize.define("Wallet", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    clientId: DataTypes.INTEGER,
    balance: DataTypes.DOUBLE,
  }, {
    tableName: 'Wallets',
    modelName: 'Wallet',
    timestamps: true, // true by default
  });

  schemaWallet.associate = (models) => {
    schemaWallet.belongsTo(models.Client, {
      foreignKey: 'clientId',
      as: 'client',
    });
  };

  return schemaWallet;
};

module.exports = Wallet;
