const express = require("express");
const upload = require("../util/multerConfig");
const catchError = require("../util/catchError");
const {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const router = express.Router();

// Fields for multiple file upload
const uploadFields = [
  { name: "courseThumbnail", maxCount: 1 },
  { name: "coursePdf", maxCount: 1 },
];

// Routes
router.post("/", upload.fields(uploadFields), catchError(createCourse));
router.get("/", catchError(getCourses));
router.get("/:id", catchError(getCourseById));
router.put("/:id", upload.fields(uploadFields), catchError(updateCourse));
router.delete("/:id", catchError(deleteCourse));

module.exports = router;
