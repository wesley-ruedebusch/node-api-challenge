const express = require("express");
const router = express.Router();
const Projects = require("../data/helpers/projectModel");
const { validateProjectId } = require("../data/helpers/validateId");
const { validateProjectPost } = require("../data/helpers/validatePostMid");

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then((actions) => {
      console.log(actions);
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post("/", validateProjectPost, (req, res) => {
  const projData = req.body;
  Projects.insert(projData)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const putProj = req.body;
  Projects.update(id, putProj)
    .then((project) => {
      project ? res.status(201).send(project) : res.status(404).send(`idk`);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then((count) => {
      res.status(200).json({
        message: `you just deleted ${count} project hope you finished it`,
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;