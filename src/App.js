import React from 'react';
import AppRouter from 'router';
import useOnSettingUpdate from 'hooks/useOnSettingUpdate';
import { StateDataProvider } from 'contexts/StateData';
import { OrderProvider } from 'contexts/Order';
import OrderController from 'contollers/OrderContoller';
import useOnOrderCreate from 'hooks/useOnOrderCreate';

function App() {
  useOnSettingUpdate(() => {
    console.log('setting updated');
  });

  useOnOrderCreate((order) => {
    console.log(order);
  });

  return (
    <>
      <OrderController />
      <AppRouter />
    </>
  );
}

export default function AppWrapper(props) {
  return (
    <StateDataProvider>
      <OrderProvider>
        <App {...props} />
        <AppRouter />
      </OrderProvider>
    </StateDataProvider>
  );
}
