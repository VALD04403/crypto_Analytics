const dataAccess = require('./data-access.js');
let returnData;

const getTotalValueWallet = async (id) => {
  let totalSpend = 0;
  const orderItems = [];
  const listItems = [];
  const totalAmountByCoin = [];
  const total = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const info = await dataAccess.getGeneralInfo(id);
  info.map((info) => {
    totalSpend = Number(info.total_invest) + Number(info.total_fees);
  });

  const purchases = await dataAccess.getPurchases(id);

  if (purchases.length > 0) {
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
  }
  if (orderItems.length > 0) {
    orderItems.map((item) => {
      const amount = item.purchases.reduce(function (res, item) {
        return res + parseFloat(item.amount_coin);
      }, 0);
      totalAmountByCoin.push({ name: item.name, amount: amount });
    });

    const getTotalValue = totalAmountByCoin.map(async (item) => {
      const value = await dataAccess.getValueCrypto(item.name);
      return total.push(value * item.amount);
    });

    Promise.all(getTotalValue).then(() => {
      const calculPercent =
        ((total.reduce(reducer) - totalSpend) / totalSpend) * 100;
      returnData = {
        walletValue: total.reduce(reducer),
        percent: Number(calculPercent).toFixed(2),
        differenceValue: (total.reduce(reducer) - totalSpend).toFixed(2),
      };
    });
  } else {
    return { noData: true };
  }
  return returnData;
};

module.exports = {
  getTotalValueWallet,
  returnData,
};
