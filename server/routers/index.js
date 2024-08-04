const express = require("express");
const router = express.Router();

// define the home page route

router.use("/users/", require("./userRouter"));

module.exports = router;
