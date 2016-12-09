'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Assignment', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
}
