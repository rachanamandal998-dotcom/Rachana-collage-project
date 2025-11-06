module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("admin", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    }

  });
  return Admin;
};
