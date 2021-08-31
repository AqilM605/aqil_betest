//middleware for handling error if req.body empty during post/delete/patch
exports.checkIfEmptyBody = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Request body can not be empty!",
    });
  }
  next();
};
