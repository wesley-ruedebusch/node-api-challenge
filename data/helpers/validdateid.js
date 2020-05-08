const Actions = require("./actionModel");
const Projects = require("./projectModel");

function validateActionId(req, res, next) {
  const actionId = req.params.id || req.body.user_id;
  Actions.get(actionId)
    .then((action) => {
      if (action) {
        req.action = action;
        return next();
      } else {
        res.status(400).json({ message: "that is not a valid id" });
      }
    })
    .catch(() => {
      res.status(400).json({ message: "cant fetch action from db" });
    });
}
function validateProjectId(req, res, next) {
  const projectId = req.params.id || req.body.user_id;
  Projects.get(projectId)
    .then((project) => {
      if (project) {
        req.project = project;
        return next();
      } else {
        res.status(400).json({ message: "that is not a valid id" });
      }
    })
    .catch(() => {
      res.status(400).json({ message: "cant fetch action from db" });
    });
}

module.exports = {
  validateActionId: validateActionId,
  validateProjectId: validateProjectId,
};