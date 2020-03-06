import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import CardWallet from '../components/Card';
import LastAction from '../components/LastActionCard';
import FormAddAction from '../components/FormAddAction';
import Purchases from '../components/Purchases';
import AppLayout from '../styles/AppLayout';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Dashboard() {
  let location = useLocation();

  if (location.pathname === '/') {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="Dashboard">
      <AppLayout>
        <Navbar></Navbar>
        <div id="wrapper" style={{ marginTop: '90px' }}>
          <ToastContainer position="top-center" />
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
