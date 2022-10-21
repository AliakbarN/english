const router = require('express').Router();
const checkTextMiddleware = require('../middleware/checkText');
const controller = require('../controller/main')

router.post('/save', checkTextMiddleware, controller.save);
router.post('/delete', controller.delete);
router.post('/save/trns', controller.saveTranslation);
router.post('/update/trns', controller.updateTranslation);
router.get('/words', controller.getWords);

module.exports = router;