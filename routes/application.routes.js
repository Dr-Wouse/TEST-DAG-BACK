const express = require("express");
const Application = require("../models/application.models");

const applicationRouter = express.Router();

// GET ALL APPLICATION

applicationRouter.get("/", async (req, res) => {
  try {
    const application = await Application.getAllApplication();
    res.send(application);
  } catch (err) {
    console.error(err);
    res.status(500).send("Cannot get the list of all applications");
  }
});

// GET ONE APPLICATION BY ID

applicationRouter.get("/:id", async (req, res) => {
  try {
    const application = await Application.getOneApplication(req.params.id);
    if (application.length === 0)
      res.status(404).send("This application doesn't exist");
    else res.send(application);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Cannot get application ${req.params.id}`);
  }
});

// GET ALL COURSE FROM APPLICATION BY ID

applicationRouter.get("/course/:id", async (req, res) => {
  try {
    const application = await Application.getOneApplication(req.params.id);
    if (application.length === 0)
      res.status(404).send("This application doesn't exist");
    else {
      const course = await Application.getAllCourseFromOneApplication(
        req.params.id
      );
      res.send({ application, ...course });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Cannot get all course from this application");
  }
});

// POST ONE APPLICATION

applicationRouter.post("/", async (req, res) => {
  const { name, version } = req.body;
  const { error: validationError } = Application.postApplication({
    name,
    version,
  });

  if (validationError) {
    res.status(422).json({ errors: validationError.details });
  } else {
    try {
      const id = await Application.postApplication({ name, version });
      res.send({ id, name, version });
    } catch (err) {
      console.error(err);
      res.status(500).send("Cannot create this Application");
    }
  }
});

module.exports = applicationRouter;
