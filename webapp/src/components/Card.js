import React, { useEffect, useState, useContext, Fragment } from 'react';
import {
  Card,
  Grid,
  Header,
  Divider,
  Dimmer,
  Loader,
  Button,
  Icon,
} from 'semantic-ui-react';
import contextUser from '../context/contextUser';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

function CardWallet() {
  let totalSpend = 0;
  const [walletValue, setWalletValue] = useState();
  const [percent, setPercent] = useState();
  const [differenceValue, setDifferenceValue] = useState();
  const [total, setTotal] = useState();
  const [fees, setFees] = useState();
  const [totalWithFees, setTotalWithFees] = useState();
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  const [mobileScreen, setMobileScreen] = useState(false);

  const { currentUser } = useContext(contextUser);

  const Greet = () => <div>Erreur lors de la récupération des données</div>;

  const getGeneralData = async () => {
    try {
      const { data } = await axios.get(`/api/user/${currentUser.id}/info`);
      if (data.data.length > 0) {
        data.data.map((info) => {
          setTotal(Number(info.total_invest).toFixed(2));
          setFees(Number(info.total_fees).toFixed(2));
          setTotalWithFees(
            (Number(info.total_invest) + Number(info.total_fees)).toFixed(2)
          );
          return (totalSpend =
            Number(info.total_invest) + Number(info.total_fees));
        });
      } else {
        setNoData(true);
      }
    } catch (error) {
      toast.error(<Greet />);
      setLoading(false);
    }
  };

  const getWalletValue = async () => {
    const { data } = await axios.get('/api/walletValue');
    if (data.noData) {
      setNoData(true);
      setLoading(false);
    } else if (data.walletValue) {
      setDifferenceValue(data.differenceValue);
      setPercent(data.percent);
      setWalletValue(data.walletValue);
      setLoading(false);
    } else {
      toast.error(<Greet />);
      setLoading(false);
    }
  };

  const numberWithSpaces = (value) => {
    if (value) {
      var parts = value.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      parts[1] = parts[1].slice(0, 2);
      return parts.join('.');
    }
  };

  //coinbase
  const cookies = new Cookies();
  const coinbaseToken = cookies.get('coinbaseToken');

  const getCoinbaseInfo = async () => {
    if (coinbaseToken) {
      const walletTransactions = [];
      const prices = [];
      try {
        const wallets = await axios.get(
          `/api/coinbase/wallets/${coinbaseToken?.access_token}`
        );
        if (!wallets.data) {
          setNoData(true);
          setLoading(false);
        } else {
          wallets.data.map(async (wallet) => {
            const transactions = await axios.get(
              `/api/coinbase/transactions/${coinbaseToken?.access_token}/${wallet.id}`
            );
            transactions.data.map((transaction) => {
              transaction.type !== 'buy' &&
                transaction.status === 'completed' &&
                walletTransactions.push({
                  amount: transaction.amount.amount,
                  sum: transaction.native_amount.amount,
                  crypto: wallet.balance.currency,
                  fee: transaction.fee ? transaction.fee : 0,
                });
            });
            const buys = await axios.get(
              `/api/coinbase/buys/${coinbaseToken?.access_token}/${wallet.id}`
            );
            buys.data.map((buy) => {
              buy.status === 'completed' &&
                walletTransactions.push({
                  fee: buy.fee.amount,
                  sum: buy.total.amount,
                  amount: buy.amount.amount,
                  crypto: wallet.balance.currency,
                });
            });
            const price = await axios.get(
              `/api/coinbase/price/${coinbaseToken.access_token}/${wallet.balance.currency}-EUR`
            );
            prices.push({
              amount: price.data.amount,
              currency: wallet.balance.currency,
            });
            getCoinbaseTotalValueWallet(walletTransactions, prices);
          });
        }
      } catch (error) {}
    }
  };

  const getCoinbaseTotalValueWallet = async (transactions, prices) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalAmountByCoin = [];
    const totalValue = [];
    const totalSum = [];
    const totalFee = [];

    const amount = transactions.reduce(function (res, item) {
      return res + parseFloat(item.amount);
    }, 0);
    const fee = transactions.reduce(function (res, item) {
      return res + parseFloat(item.fee);
    }, 0);

    // retourne uniquement les transactions de type achat
    const onlyBuys = transactions.filter(
      (transaction) => Math.sign(transaction.sum) === 1
    );
    const sum = onlyBuys.reduce(function (res, item) {
      return res + parseFloat(item.sum);
    }, 0);

    totalAmountByCoin.push({ amount, fee, sum });
    totalAmountByCoin.map((total, index) => {
      totalValue.push(total.amount * Number(prices[index].amount));
      totalFee.push(total.fee);
      totalSum.push(total.sum);
    });
    setWalletValue(Number(totalValue.reduce(reducer)).toFixed(2));
    setTotalWithFees(Number(totalSum.reduce(reducer).toFixed(2)));
    setTotal(
      Number(totalSum.reduce(reducer) - totalFee.reduce(reducer)).toFixed(2)
    );
    setFees(Number(totalFee.reduce(reducer).toFixed(2)));
    setPercent(
      Number(
        ((totalValue.reduce(reducer) - totalSum.reduce(reducer)) /
          totalSum.reduce(reducer)) *
          100
      ).toFixed(2)
    );
    setDifferenceValue(
      (totalValue.reduce(reducer) - totalSum.reduce(reducer)).toFixed(2)
    );
    setLoading(false);
  };

  const windowResize = () => {
    window.innerWidth < 768 ? setMobileScreen(true) : setMobileScreen(false);
  };

  useEffect(() => {
    windowResize();
    function handleResize() {
      windowResize();
    }
    window.addEventListener('resize', handleResize);
    window.scrollTo(0, 0);

    !currentUser.coinbaseUser ? getGeneralData() : getCoinbaseInfo();
    !currentUser.coinbaseUser && getWalletValue();
  }, []);

  return (
    <Card fluid>
      <Card.Content>
        <Header style={{ opacity: '0.6' }} floated='left'>
          <Icon name='dollar' />
          Solde du portefeuille
        </Header>
      </Card.Content>
      <Card.Content>
        {!loading && !noData ? (
          <Grid stackable columns={3} divided>
            {walletValue && percent && differenceValue && (
              <Grid.Row>
                <Grid.Column>
                  Solde portefeuille:{' '}
                  <h2 style={{ marginTop: '5px' }}>
                    {walletValue && numberWithSpaces(walletValue)} €
                  </h2>
                </Grid.Column>
                <Grid.Column>
                  {percent > 0 ? 'Plus-value' : ' Moins-value'} portefeuille: %
                  <Header
                    style={{ marginTop: '5px' }}
                    as='h2'
                    color={percent > 0 ? 'green' : 'red'}
                  >
                    {percent > 0 && '+'}
                    {percent} %
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  {differenceValue > 0 ? 'Plus-value' : ' Moins-value'}{' '}
                  portefeuille: €
                  <Header
                    style={{ marginTop: '5px' }}
                    as='h2'
                    color={differenceValue > 0 ? 'green' : 'red'}
                  >
                    {differenceValue > 0 && '+'}{' '}
                    {numberWithSpaces(differenceValue)} €
                  </Header>
                </Grid.Column>
              </Grid.Row>
            )}
            {!mobileScreen && walletValue && percent && differenceValue && (
              <Divider></Divider>
            )}

            <Grid.Row>
              <Grid.Column>
                Fonds investis:{' '}
                <h2 style={{ marginTop: '5px' }}>
                  {numberWithSpaces(total)} €{' '}
                </h2>
              </Grid.Column>
              <Grid.Column>
                Frais:{' '}
                <h2 style={{ marginTop: '5px' }}>{numberWithSpaces(fees)} €</h2>
              </Grid.Column>
              <Grid.Column>
                Fonds investis avec frais:{' '}
                <h2 style={{ marginTop: '5px' }}>
                  {numberWithSpaces(totalWithFees)} €
                </h2>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <Fragment>
            <p style={{ marginTop: '15px' }}>
              Vous n'avez pas encore ajoutez de transactions.
            </p>
            {!currentUser.coinbaseUser &&
              window.location.pathname === '/accueil' && (
                <Button
                  style={{ marginTop: '15px', marginBottom: '10px' }}
                  as={Link}
                  to='/portefeuille'
                  basic
                >
                  Ajouter ma première tansaction
                </Button>
              )}
          </Fragment>
        )}
        {loading && (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
      </Card.Content>
    </Card>
  );
}

export default CardWallet;
