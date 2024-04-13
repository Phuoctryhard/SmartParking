const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController");
router.get("/", userController.show);
router.get("/", userController.get);
router.post("/", userController.create);
router.delete("/", userController.delete);
router.get("/", userController.edit);
router.put("/", userController.update);

module.exports = router;