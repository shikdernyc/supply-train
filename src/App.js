import React from 'react';
import AppRouter from 'router';
import { StateDataProvider } from 'contexts/StateData';
import { OrderProvider } from 'contexts/Order';
import { SnackbarProvider } from 'notistack';

export default function App() {
  return (
    <>
      <OrderProvider>
        <StateDataProvider>
          <SnackbarProvider maxSnack={3}>
            <AppRouter />
          </SnackbarProvider>
        </StateDataProvider>
      </OrderProvider>
    </>
  );
}
