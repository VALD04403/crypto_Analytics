const dataAccess = require('./data-access');

const getPurchases = async (req, res) => {
  const purchases = await dataAccess.getPurchases();
  return res.status(200).json({ purchases });
};

const createPurchase = async (req, res) => {
  const purchase = await dataAccess.createPurchase();
  return status(201).json({ purchase });
};

module.exports = { getPurchases, createPurchase };
