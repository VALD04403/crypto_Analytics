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
    const data = await dataAccess.getGeneralInfo();
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
    const updateTotal = data[0].total_invest + amountEuro;
    const updateFees = data[0].total_fees + fees;
    await dataAccess.updateGeneralInfo(updateTotal, updateFees);
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

const getGeneralInfo = async (req, res) => {
  const data = await dataAccess.getGeneralInfo();
  return res.status(200).json({ data });
};

const getLast5Purchase = async (req, res) => {
  const top5 = await dataAccess.getLast5Purchase();
  return res.status(200).json({ top5 });
};

const getValueCoin = async (req, res) => {
  const { coin } = req.params;
  const response = await dataAccess.getValueCrypto(coin);
  return res.status(200).json({ response });
};

const getTopListValue = async (req, res) => {
  const response = await dataAccess.getTopList();
  return res.status(200).json({ response });
};

module.exports = {
  getPurchases,
  getPurchasesByCoin,
  createPurchase,
  deletePurchase,
  getValueCoin,
  getGeneralInfo,
  getLast5Purchase,
  getTopListValue,
};
