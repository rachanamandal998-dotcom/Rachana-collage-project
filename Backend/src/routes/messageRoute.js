const { createContact, getMessage } = require("../controllers/contactController");
const catchError = require("../util/catchError");


const router = require("express").Router();

router.route("/message").post(catchError(createContact)).get(catchError(getMessage));

module.exports = router;
