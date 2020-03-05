import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import CardWallet from '../components/Card';
import LastAction from '../components/LastActionCard';
import FormAddAction from '../components/FormAddAction';
import Purchases from '../components/Purchases';
import AppLayout from '../styles/AppLayout';

function Dashboard() {
  return (
    <div className="Dashboard">
      <AppLayout>
        <Navbar></Navbar>
        <div id="wrapper" style={{ marginTop: '90px' }}>
          <Route path="/dashboard" component={() => <CardWallet />} />
          <Route path="/dashboard" component={() => <LastAction />} />
          <Route path="/wallet" component={() => <FormAddAction />} />
          <Route path="/wallet" component={() => <Purchases />} />
        </div>
      </AppLayout>
    </div>
  );
}

export default Dashboard;
