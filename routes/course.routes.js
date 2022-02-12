const express = require("express");
const Course = require("../models/course.models");

const courseRouter = express.Router();

// GET ALL COURSE

courseRouter.get("/", async (req, res) => {
  try {
    const course = await Course.getAllCourse();
    res.send(course);
  } catch (err) {
    console.error(err);
    res.status(500).send("Cannot get all course");
  }
});

// GET ONE COURSE BY ID

courseRouter.get("/:id", async (req, res) => {
  try {
    const course = await Course.getOneCourse(req.params.id);
    if (course.length === 0) res.status(404).send("This course doesn't exist");
    else res.send(course);
  } catch (err) {
    console.error(err);
    res.status(500).send("Cannot get this course");
  }
});

// POST ONE COURSE

courseRouter.post("/", async (req, res) => {
  const { name, date, application_id } = req.body;
  const { error: validationError } = Course.postCourse({
    name,
    date,
    application_id,
  });

  if (validationError) {
    res.status(422).json({ errors: validationError.details });
  } else {
    try {
      const id = await Course.postCourse({ name, date, application_id });
      res.send({ id, name, date, application_id });
    } catch (err) {
      console.error(err);
      res.status(500).send("Cannot create this course");
    }
  }
});

module.exports = courseRouter;
