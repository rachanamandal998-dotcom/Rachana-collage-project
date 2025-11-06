const { courses } = require("../database");

// Create a new course
const createCourse = async (req, res) => {
  const { courseName, courseDescription } = req.body;
  const courseThumbnail = req.files?.courseThumbnail
    ? req.files.courseThumbnail[0].filename
    : null;
  const coursePdf = req.files?.coursePdf
    ? req.files.coursePdf[0].filename
    : null;

  const course = await courses.create({
    courseName,
    courseDescription,
    courseThumbnail,
    coursePdf,
  });

  res.status(201).json(course);
};

// Get all courses
const getCourses = async (req, res) => {
  const data = await courses.findAll();
  res.status(200).json(data);
};

// Get a single course by id
const getCourseById = async (req, res) => {
  const data = await courses.findByPk(req.params.id);
  if (!data) return res.status(404).json({ message: "Course not found" });
  res.status(200).json(data);
};

// Update a course
const updateCourse = async (req, res) => {
  const course = await courses.findByPk(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const { courseName, courseDescription } = req.body;
  const courseThumbnail = req.files?.courseThumbnail
    ? req.files.courseThumbnail[0].filename
    : course.courseThumbnail;
  const coursePdf = req.files?.coursePdf
    ? req.files.coursePdf[0].filename
    : course.coursePdf;

  await courses.update({
    courseName,
    courseDescription,
    courseThumbnail,
    coursePdf,
  });

  res.status(200).json(course);
};

// Delete a course
const deleteCourse = async (req, res) => {
  const course = await courses.findByPk(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  await course.destroy();
  res.status(200).json({ message: "Course deleted successfully" });
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
