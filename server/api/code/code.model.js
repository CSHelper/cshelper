'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Code', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSuccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isSubmit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
}
