const router = require('express').Router({ mergeParams: true });

const controllers = require('./controllers');

const { allowPermissionOnPurchases } = require('./middlewares');

router.use(allowPermissionOnPurchases);

router.get('/', controllers.getPurchases);

module.exports = router;
