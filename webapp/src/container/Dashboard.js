import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { CardWallet } from '../components/Card';
import AppLayout from '../styles/AppLayout';

function Dashboard() {
  return (
    <div className="Dashboard">
      <AppLayout>
        <Navbar></Navbar>
        <Route path="/dashboard" component={() => <CardWallet />} />
      </AppLayout>
    </div>
  );
}

export default Dashboard;
