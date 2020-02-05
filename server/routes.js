const router = require('express').Router();

const controllers = require('./controllers');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/purchases', controllers.getPurchases);
router.post('/purchase', controllers.createPurchase);

module.exports = router;
