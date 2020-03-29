import React from 'react';
import AppRouter from 'router';
import useOnSettingUpdate from 'hooks/useOnSettingUpdate';

function App() {
  useOnSettingUpdate(() => {
    console.log('setting updated');
  });

  return (
    <AppRouter />
  );
}

export default App;
