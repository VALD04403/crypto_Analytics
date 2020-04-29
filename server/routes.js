const router = require('express').Router();

const controllers = require('./controllers');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/purchases', controllers.getPurchases);
router.get('/purchasesByCoin', controllers.getPurchasesByCoin);
router.post('/purchase', controllers.createPurchase);
router.delete('/purchase', controllers.deletePurchase);
router.get('/totalWallet', controllers.getTotalValueWallet);
router.get('/value/:coin', controllers.getValueCoin);
router.get('/info', controllers.getGeneralInfo);
router.get('/top5', controllers.getLast5Purchase);

module.exports = router;
