const router = require("express").Router();
const controller = require("../controller/theaters.controller");
const methodNotAllowed = require("../utils/methodNotAllowed");

router.route('/')
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;