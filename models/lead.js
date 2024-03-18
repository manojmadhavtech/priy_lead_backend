'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {
      models.Lead.belongsTo(models.categories,
        { foreignKey: 'lead_for', as: 'categories' }
      )
    
      models.Lead.belongsTo(models.status,
        { foreignKey: 'status', as: 'statuses' }
      )
      models.Lead.belongsTo(models.area,
        { foreignKey: 'area', as: 'areas' }
      )
      models.Lead.belongsTo(models.data_source,
        { foreignKey: 'data_source', as: 'data_sources' }
      )
    }
  }

  Lead.init({
    lead_for: DataTypes.INTEGER,
    client_name: DataTypes.STRING,
    company_name: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    email: DataTypes.STRING,
    area: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    data_source: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    reminder_date: DataTypes.DATE,
    interest: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at', 
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at', 
    },
  }, {
    sequelize,
    modelName: 'Lead',
    tableName: 'Lead', // Specify the table name here
    freezeTableName: true, // Prevent Sequelize from automatically pluralizing the table name
  });

  return Lead;
};
