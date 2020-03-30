import React from 'react';
import AppRouter from 'router';
import useOnSettingUpdate from 'hooks/useOnSettingUpdate';
import { StateDataProvider } from 'contexts/StateData';
import { OrderProvider } from 'contexts/Order';
import useOrderController from 'contollers/OrderContoller';
import useOnOrderCreate from 'hooks/useOnOrderCreate';
import useIsSetupComplete from 'hooks/useIsSetupComplete';

function App() {
  useOnSettingUpdate(() => {
    console.log('setting updated');
  });
  useOrderController();

  const setupCompleted = useIsSetupComplete();

  useOnOrderCreate((order) => {
    // console.log(order);
  });

  return (
    <>
      {setupCompleted && (
        <AppRouter />
      )}
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
