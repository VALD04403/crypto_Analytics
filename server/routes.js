const router = require('express').Router();

const controllers = require('./controllers');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/purchases', controllers.getPurchases);
router.get('/purchasesByCoin', controllers.getPurchasesByCoin);
router.post('/purchase', controllers.createPurchase);
router.delete('/purchase', controllers.deletePurchase);

module.exports = router;
