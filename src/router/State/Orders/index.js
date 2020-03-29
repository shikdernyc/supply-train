import React from 'react';
// core components
import Grid from 'components/Grid';
import { OrderProvider } from 'contexts/Order';
import CurrentOrdersTable from './CurrentOrdersTable';
import CompletedOrdersTable from './CompletedOrdersTable';

export default function TableList() {
  return (
    <OrderProvider>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <CurrentOrdersTable />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <CompletedOrdersTable />
        </Grid>
      </Grid>
    </OrderProvider>
  );
}
