const dataAccess = require('./data-access');

const getPurchases = async (req, res) => {
  const purchases = await dataAccess.getPurchases();
  return res.status(200).json({ purchases });
};

const getPurchasesByCoin = async (req, res) => {
  const { coin } = req.body;
  const purchases = await dataAccess.getPurchasesByCoin(coin);
  return res.status(200).json({ purchases });
};

const createPurchase = async (req, res) => {
  try {
    const {
      cryptoName,
      date,
      price,
      amountEuro,
      amountCrypto,
      fees
    } = req.body;
    await dataAccess.createPurchase(
      cryptoName,
      date,
      price,
      amountEuro,
      amountCrypto,
      fees
    );
  } catch (error) {
    return res.status(400).send({ errorMessage: error.message });
  }
  return res.sendStatus(201);
};

const deletePurchase = async (req, res) => {
  const { id } = req.body;
  const response = await dataAccess.deletePurchase(id);
  return res.status(200).json({ response });
};

const getValueCoin = async (req, res) => {
  const { coin } = req.params;
  const response = await dataAccess.getValueCrypto(coin);
  return res.status(200).json({ response });
};

const getTotalValueWallet = async () => {
  const orderItems = [];
  const listItems = [];

  const totalAmountByCoin = [];
  const valueOfCoins = [];

  const total = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const purchases = await dataAccess.getPurchases();
  purchases.map(item => {
    if (listItems.indexOf(item.coin_name) === -1) {
      const coin = {
        name: item.coin_name,
        purchases: []
      };
      orderItems.push(coin);
      listItems.push(item.coin_name);
    }
    orderItems.map(purchase => {
      if (purchase.name === item.coin_name) {
        purchase.purchases.push(item);
      }
    });
  });

  orderItems.map(item => {
    const amount = item.purchases.reduce(function(res, item) {
      return res + parseFloat(item.amount_coin);
    }, 0);
    totalAmountByCoin.push(amount);
  });

  listItems.map(async coin => {
    const value = await dataAccess.getValueCrypto(coin);
    valueOfCoins.push(value);
  });

  for (let i = 0; i < totalAmountByCoin.length; i++) {
    let value = totalAmountByCoin[i] * valueOfCoins[i];
    console.log(value);
  }

  // return total.reduce(reducer);
};

module.exports = {
  getPurchases,
  getPurchasesByCoin,
  createPurchase,
  deletePurchase,
  getValueCoin,
  getTotalValueWallet
};
