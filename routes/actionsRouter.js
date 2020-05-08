const express = require("express");
const router = express.Router();
const Actions = require("../data/helpers/actionModel");
const { validateActionPost } = require("../data/helpers/validatePostMid");

//get all actions from the database
router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post("/", validateActionPost, (req, res) => {
  const actionBody = req.body;
  Actions.insert(actionBody)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedAction = req.body;
  Actions.update(id, updatedAction)
    .then((action) => {
      action ? res.status(201).send(action) : res.status(404).send(`idk`);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
      .then((numberOf) => {
        res
          .status(200)
          .json({
            message: `you just deleted ${numberOf} action hope you finished it`,
          });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });

module.exports = router;