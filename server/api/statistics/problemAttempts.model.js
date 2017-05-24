'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('ProblemAttemptView', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    isSuccess: DataTypes.BOOLEAN,
    attempts: DataTypes.INTEGER,
    problemId: DataTypes.INTEGER,
    title: DataTypes.STRING
  });
}
