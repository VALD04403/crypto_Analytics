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

module.exports = {
  getPurchases,
  getPurchasesByCoin,
  createPurchase,
  deletePurchase,
  getValueCoin
};
