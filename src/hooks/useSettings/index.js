import { useContext } from 'react';
import SettingsContext from 'contexts/Settings';

export default function useSettings() {
  const { settings } = useContext(SettingsContext);

  return settings;
}
