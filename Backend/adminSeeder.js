
const bcrypt = require("bcrypt");
const { admins } = require("./src/database");

const adminSeeder = async () => {
  const [data] = await admins.findAll({
    where: {
      email: "admin@gmail.com",
    },
  });
  if (!data) {
    await admins.create({
      email: "admin@gmail.com",
      password: bcrypt.hashSync("admin123", 8),
      username: "admin",
      role: "admin",
    });
    console.log("admin credentials seeded successfully ");
  } else {
    console.log("admin credentials already seeded");
  }
};

module.exports = adminSeeder;
