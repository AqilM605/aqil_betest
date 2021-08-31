const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { checkIfEmptyBody } = require("../middleware/handlingError");
const { authMiddleware } = require("../middleware/auth");

module.exports = (app) => {
  // Getting all user
  router.get("/", authMiddleware(), userController.get);

  // Getting one user
  router.get("/:id", authMiddleware(), userController.getById);

  // Create user
  router.post("/", checkIfEmptyBody, userController.create);

  // Updating user
  router.patch(
    "/:id",
    authMiddleware(),
    checkIfEmptyBody,
    userController.update
  );

  // Deleting user
  router.delete("/:id", authMiddleware(), userController.delete);

  app.use("/api/user", router);
};
