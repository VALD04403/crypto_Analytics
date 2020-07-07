const router = require('express').Router({ mergeParams: true });

const controllers = require('./controllers');

const { allowPermissionOnPurchases } = require('./middlewares');

router.use(allowPermissionOnPurchases);

router.get('/list', controllers.getPurchases);
router.get('/:coinName', controllers.getPurchasesByCoin);
router.delete('/delete/:purchaseId', controllers.deletePurchase);
router.post('/addPurchase', controllers.createPurchase);

module.exports = router;
