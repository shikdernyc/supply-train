import React from 'react';
// core components
import Grid from 'components/Grid';
import CurrentOrdersTable from './CurrentOrdersTable';
import CompletedOrdersTable from './OrderHistoryTable';

export default function TableList() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <CurrentOrdersTable />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <CompletedOrdersTable />
      </Grid>
    </Grid>
  );
}
