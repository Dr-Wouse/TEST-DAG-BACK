const Joi = require("joi");
const connection = require("../db-config");

const validateCourse = (application) => {
  return Joi.object({
    name: Joi.string().max(100).presence("required"),
    date: Joi.date().presence("optional"),
    application_id: Joi.number().presence("required"),
  }).validate(application, { abortEarly: false });
};

const postCourse = ({ name, date, application_id }) => {
  return connection
    .promise()
    .query("INSERT INTO course (name, date, application_id) VALUES (?,?,?)", [
      name,
      date,
      application_id,
    ])
    .then(([res]) => res.insertId);
};

const getAllCourse = () => {
  return connection
    .promise()
    .query("SELECT * FROM course")
    .then(([res]) => res);
};

const getOneCourse = (id) => {
  return connection
    .promise()
    .query("SELECT * FROM course WHERE id = ?", [id])
    .then(([res]) => res);
};

module.exports = {
  validateCourse,
  postCourse,
  getAllCourse,
  getOneCourse,
};
