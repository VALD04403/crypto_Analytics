const router = require('express').Router();

const controllers = require('./controllers');

const { allowAuthenticatedUserOnly } = require('./middlewares');

const routesPurchases = require('./routesPurchases');
const routesUser = require('./routesUser');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.post('/createUser', controllers.createUser);
router.get('/whoami', controllers.getCurrentUser);

router.post('/sessions', controllers.createSession);
router.delete('/sessions', controllers.deleteSession);

router.use(allowAuthenticatedUserOnly);

router.use('/purchases/:userId', routesPurchases);
router.use('/user/:userId', routesUser);

router.get('/value/:coin', controllers.getValueCoin);
router.get('/listValue', controllers.getTopListValue);
router.get('/newsArticles', controllers.getNewsArticles);

module.exports = router;
