const express = require("express");
const router = express.Router();
const Actions = require("../data/helpers/actionModel");

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

module.exports = router;