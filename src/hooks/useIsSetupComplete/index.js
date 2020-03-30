import { useContext } from 'react';
import StateDataContext from 'contexts/StateData';

export default function useIsSetupComplete() {
  const { loading } = useContext(StateDataContext);

  return loading === false;
}
