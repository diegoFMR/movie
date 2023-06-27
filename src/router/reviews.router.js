const router = require("express").Router();
const controller = require("../controller/reviews.controller");
const methodNotAllowed = require("../utils/methodNotAllowed");

router.route('/:reviewId')
    .put(controller.put)
    .delete(controller.destroy)
    .all(methodNotAllowed);

module.exports = router;