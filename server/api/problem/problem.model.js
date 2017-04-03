'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Problem', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title:{ 
      type: DataTypes.STRING(25),
      allowNull: false
    },
    description: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  });
}
