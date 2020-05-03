const router = require('express').Router();

const controllers = require('./controllers');
const { allowAuthenticatedUserOnly } = require('./middlewares');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/purchases', controllers.getPurchases);
router.get('/purchasesByCoin', controllers.getPurchasesByCoin);
router.post('/purchase', controllers.createPurchase);
router.delete('/purchase', controllers.deletePurchase);
router.get('/info', controllers.getGeneralInfo);
router.get('/top5', controllers.getLast5Purchase);

router.get('/value/:coin', controllers.getValueCoin);
router.get('/listValue', controllers.getTopListValue);

router.post('/createUser', controllers.createUser);
router.post('/sessions', controllers.createSession);
router.delete('/sessions', controllers.deleteSession);
router.get('/whoami', controllers.getCurrentUser);

router.use(allowAuthenticatedUserOnly);

module.exports = router;
