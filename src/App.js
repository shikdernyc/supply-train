import React from 'react';
import AppRouter from 'router';
import useOnSettingUpdate from 'hooks/useOnSettingUpdate';
import useOnCriticalCaseChange from 'hooks/useOnCriticalCaseChange';
import { StateDataProvider } from 'contexts/StateData';

function OrderController() {
  useOnCriticalCaseChange((state, prevCritCase, newCritCase) => {
    console.log(`${state} changed their critical cases from ${prevCritCase} to ${newCritCase}`);
  });

  return <></>;
}

function App() {
  useOnSettingUpdate(() => {
    console.log('setting updated');
  });

  return (
    <StateDataProvider>
      <OrderController />
      <AppRouter />
    </StateDataProvider>
  );
}

export default App;
