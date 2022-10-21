const router = require('express').Router();
const controller = require('../controller/main');

router.get('/', controller.getHomePage);
router.get('/words', controller.getWordsPage);
router.get('/lern', controller.getLernPage);


module.exports = router;