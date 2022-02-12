const Joi = require("joi");
const connection = require("../db-config");

const validateApplication = (application) => {
  return Joi.object({
    name: Joi.string().max(100).presence("required"),
    version: Joi.number(),
  }).validate(application, { abortEarly: false });
};

// POST APPLICATION

const postApplication = ({ name, version }) => {
  return connection
    .promise()
    .query("INSERT INTO application (name, version) VALUES (?,?)", [
      name,
      version,
    ])
    .then(([res]) => res.insertId);
};

// GET ALL APPLICATION

const getAllApplication = () => {
  return connection
    .promise()
    .query("SELECT * FROM application")
    .then(([res]) => res);
};

// GET ONE APPLICATION

const getOneApplication = (id) => {
  return connection
    .promise()
    .query("SELECT * FROM application WHERE id = ?", [id])
    .then(([res]) => res);
};

// GET ONE COURSE BY APPLICATION

const getAllCourseFromOneApplication = (id) => {
  return connection
    .promise()
    .query("SELECT * FROM course WHERE application_id = ?", [id])
    .then(([res]) => res);
};

module.exports = {
  validateApplication,
  postApplication,
  getAllApplication,
  getOneApplication,
  getAllCourseFromOneApplication,
};
