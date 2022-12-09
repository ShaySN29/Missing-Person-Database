const express = require("express");
const router = express.Router();
const { addNewUser, loginUser, resourceEndpoint, deleteUser, updateUserAdmin, listUsers } = require("../controllers/users.controller");

router.post("/adduser", addNewUser);

router.post("/login", loginUser);

router.get("/resource", resourceEndpoint);

router.delete("/deleteuser", deleteUser);

router.put("/updateuser", updateUserAdmin);

router.get("/listusers", listUsers);

module.exports = router;