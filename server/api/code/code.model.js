'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Code', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    language: DataTypes.STRING(20),
    content: DataTypes.STRING,
    isSuccess: DataTypes.BOOLEAN,
    type: {
      type: DataTypes.STRING(5)
    }
  });
}
