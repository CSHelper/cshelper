export default function(sequelize, DataTypes) {
  return sequelize.define('AssignmentDetail', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    assignerName: {
      type: DataTypes.STRING
    },
    assignerId: {
      type: DataTypes.INTEGER
    },
    assigneeName: {
      type: DataTypes.STRING
    },
    assigneeId: {
      type: DataTypes.INTEGER
    },
    problemId: {
      type: DataTypes.INTEGER
    },
    deadline: {
      type: DataTypes.DATE
    }
  });
}
