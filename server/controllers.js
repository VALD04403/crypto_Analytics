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
    console.log(req.body);
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

module.exports = { getPurchases, getPurchasesByCoin, createPurchase };
