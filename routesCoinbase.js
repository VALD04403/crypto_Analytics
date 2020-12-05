const router = require('express').Router({ mergeParams: true });
const controllers = require('./controllers');

router.get('/user/:token', controllers.getUserCoinbase);
router.get('/wallets/:token', controllers.getUserWallets);
router.get(
  '/transactions/:token/:accountId',
  controllers.getUserTransactionsWallets
);
router.get('/buys/:token/:accountId', controllers.getUserBuysWallets);
router.get('/price/:token/:currency_pair', controllers.getPriceCrypto);
router.post('/token', controllers.getToken);

module.exports = router;
