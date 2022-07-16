
const Client = (sequelize, DataTypes) => {
  const schemaClient = sequelize.define("Client", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName: 'Clients',
    modelName: 'Client',
    timestamps: true, // true by default
  });

  schemaClient.associate = (models) => {
    schemaClient.hasOne(models.Wallet, {
      foreignKey: 'clientId',
      as: 'wallet',
    });
  };

  return schemaClient;
};

module.exports = Client;
