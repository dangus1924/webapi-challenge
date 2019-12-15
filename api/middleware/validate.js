const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel')



function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;

  const errors = {};
  if (!project_id) errors.project_id = "Please enter project_id";
  if (!description) errors.missingDescription = "Please enter description";
  if (!notes) errors.missingNotes = "Please enter notes";
  if (Object.keys(errors).length) res.status(400).json(errors);

  next();
}

function validateActionId(req, res, next) {
  const { id } = req.params;

  actions.get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({ statusCode: 400, errorMessage: "Action of that Id does not exist" });
      }
    })
    .catch(err => next({ originalError: err }));
}

function validateProject(req, res, next) {
  const { name, description } = req.body;

  const errors = {};
  if (!name) errors.missingName = "Please Enter Name";
  if (!description) errors.missingDescription = "Please Enter Description";
  if (Object.keys(errors).length) res.status(400).json(errors);

  next();
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  projects.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        // res.status(400).json({ error: "Project of That Id does not exist" });
        next({ statusCode: 400, errorMessage: "Project of that Id does not exist" });
      }
    })
    .catch(err => next({ originalError: err }));
}

module.exports = {
  validateActionId, validateAction, validateProject, validateProjectId
}