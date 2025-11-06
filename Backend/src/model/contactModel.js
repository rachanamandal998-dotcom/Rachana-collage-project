module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("contact", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false, 
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  return Contact;
};
