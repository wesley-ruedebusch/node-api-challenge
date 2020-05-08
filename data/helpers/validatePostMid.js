function validateProjectPost(req, res, next) {
    if (!req.body) {
      res
        .status(400)
        .json({ message: "we can not locate any post data in the request body" });
    } else if (!req.body.name) {
      res.status(400).json({
        message:
           "We need a name",
      });
    } else if (!req.body.description) {
      res.status(400).json({
        message:
           "description: I describe this post" ,
      });
    } else {
      
      next();
    }
  }
  function validateActionPost(req, res, next) {
    let id = req.body.project_id;
    Projects.get(id)
      .then((project) => {
        if (project) {
          if (!req.body) {
            res.status(400).json({ message: "missing action data" });
          } else {
            if (
              !req.body.description ||
              !req.body.notes ||
              !req.body.project_id
            ) {
              res
                .status(400)
                .json({ message: "missing description notes or a project_id" });
            } else {
              next();
            }
          }
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, error });
      });
  }
  
  module.exports = {
    validateProjectPost: validateProjectPost,
    validateActionPost: validateActionPost,
  };