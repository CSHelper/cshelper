'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('UserCodeView', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    problemId: DataTypes.INTEGER,
    language: DataTypes.STRING,
    isSuccess: DataTypes.BOOLEAN,
    content: DataTypes.STRING,
    title: DataTypes.STRING
  });
}