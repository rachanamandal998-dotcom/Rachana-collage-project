const { handleAdminLogin } = require("../controllers/authConroller");
const catchError = require("../util/catchError");

const router = require("express").Router();

router.route("/admin/login").post(catchError(handleAdminLogin));

module.exports = router;
