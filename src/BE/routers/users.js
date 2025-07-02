const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router.post("/", usersController.createUser);
router.get("/", usersController.getUserAll);
router.get("/:userIdOrNickname", usersController.getUserOne);
router.put("/:userId", usersController.updateUser);
router.delete("/:userId", usersController.deleteUser);

module.exports = router;
