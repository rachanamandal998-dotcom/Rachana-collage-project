module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("course", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    courseThumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    coursePdf: {
      type: DataTypes.STRING, 
    },

    courseDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });

  return Course;
};
