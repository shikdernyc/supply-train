import { useContext, useEffect } from 'react';
import SettingsContext from 'contexts/Settings';

export default function useOnSettingUpdate(fn) {
  const { onSettingChange, removeOnSettingChange } = useContext(SettingsContext);
  onSettingChange(fn);

  useEffect(() => () => {
    // CLEAN UPO
    removeOnSettingChange(fn);
  }
  // eslint-disable-next-line
  , []);
}
