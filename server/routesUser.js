const router = require('express').Router({ mergeParams: true });

const controllers = require('./controllers');

const { allowPermissionOnPurchases } = require('./middlewares');

router.use(allowPermissionOnPurchases);

router.get('/info', controllers.getGeneralInfo);
router.get('/top5', controllers.getLast5Purchase);

module.exports = router;
