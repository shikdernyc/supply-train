import { useContext, useEffect } from 'react';
import StateDataContext from 'contexts/StateData';

export default function useOnCriticalCaseChange(fn) {
  const { onCriticalCaseChange, removeOnCriticalCaseChange } = useContext(StateDataContext);
  onCriticalCaseChange(fn);

  useEffect(() => () => {
    removeOnCriticalCaseChange(fn);
    // eslint-disable-next-line
  }, []);
}
