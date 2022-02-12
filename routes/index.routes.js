const applicationRouter = require("./application.routes");
const courseRouter = require("./course.routes");

const Routes = (app) => {
  app.use("/application", applicationRouter);
  app.use("/course", courseRouter);
};

module.exports = {
  Routes,
};
