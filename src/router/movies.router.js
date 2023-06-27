const router = require("express").Router();
const controller = require("../controller/movies.controller");
const methodNotAllowed = require("../utils/methodNotAllowed");


router.route('/')
    .get(controller.list)
    .all(methodNotAllowed);

router.route('is_showing=true')
    .get(controller.list)
    .all(methodNotAllowed);

router.route('/:movieId')
    .get(controller.read)
    .all(methodNotAllowed);

router.route('/:movieId/critics')
    .get(controller.notInclude)
    .all(methodNotAllowed);
    
router.route('/:movieId/theaters')
    .get(controller.getTheathersByMovie)
    .all(methodNotAllowed);

router.route('/:movieId/reviews')
    .get(controller.getReviewsByMovie)
    .all(methodNotAllowed);



module.exports = router;