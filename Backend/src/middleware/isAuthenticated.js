const jwt = require('jsonwebtoken');
const { admins } = require('../model');


const Roles = Object.freeze({
  Admin: 'admin',
  Customer: 'customer'
});


const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ message: "Token not verified" });
  }

  jwt.verify(token, "echo", async (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }

    try {
      const userData = await admins.findByPk(decoded.id);
      if (!userData) {
        return res.status(401).json({ message: "No user with that token found" });
      }

      req.user = userData;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Something went wrong" });
    }
  });
};

const restrictedTo = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "You don't have permission" });
    }

    next();
  };
};

module.exports = {
  
  isAuthenticated,
  restrictedTo,
  Roles
};
