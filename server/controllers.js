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
      fees,
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

const getTotalValueWallet = async (req, res) => {
  const orderItems = [];
  const listItems = [];

  const totalAmountByCoin = [];
  const valueOfCoins = [];

  const total = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const purchases = await dataAccess.getPurchases();
  purchases.map((item) => {
    if (listItems.indexOf(item.coin_name) === -1) {
      const coin = {
        name: item.coin_name,
        purchases: [],
      };
      orderItems.push(coin);
      listItems.push(item.coin_name);
    }
    orderItems.map((purchase) => {
      if (purchase.name === item.coin_name) {
        purchase.purchases.push(item);
      }
    });
  });

  orderItems.map((item) => {
    const amount = item.purchases.reduce(function (res, item) {
      return res + parseFloat(item.amount_coin);
    }, 0);
    totalAmountByCoin.push({ name: item.name, amount: amount });
  });

  getValueOfCoins(listItems);

  // for (let i = 0; i < totalAmountByCoin.length; i++) {
  //   let value = (await totalAmountByCoin[i]) * (await valueOfCoins[i]);
  //   console.log(value);
  // }
  // return total.reduce(reducer);
  return res.status(200).json({ valueOfCoins });
};

const getValueOfCoins = async (list) => {
  const valueOfCoins = [];
  list.map(async (coin) => {
    const value = await dataAccess.getValueCrypto(coin);
    valueOfCoins.push({ name: coin, price: value });
  });
  console.log(valueOfCoins);
  return valueOfCoins;
};

const getGeneralInfo = async (req, res) => {
  const data = await dataAccess.getGeneralInfo();
  return res.status(200).json({ data });
};

module.exports = {
  getPurchases,
  getPurchasesByCoin,
  createPurchase,
  deletePurchase,
  getValueCoin,
  getTotalValueWallet,
  getGeneralInfo,
};
