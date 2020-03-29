import { useContext } from 'react';
import useCurrentState from 'hooks/useCurrentState';
import StateDataContext from 'contexts/StateData';

export function useCurrentStateTotalCases() {
  const [currentState] = useCurrentState();
  const { totalCases } = useContext(StateDataContext);

  return totalCases[currentState];
}

export function useCurrentStateNewCases() {
  const [currentState] = useCurrentState();
  const { newCases } = useContext(StateDataContext);

  return newCases[currentState];
}

export function useCurrentStateActiveCases() {
  const [currentState] = useCurrentState();
  const { activeCases } = useContext(StateDataContext);

  return activeCases[currentState];
}

export function useCurrentStateIncomingVentilators() {
  const [currentState] = useCurrentState();
  const { incomingVentilators } = useContext(StateDataContext);

  return incomingVentilators[currentState];
}

export function useCurrentStateCriticalCases() {
  const [currentState] = useCurrentState();
  const { criticalCases, setStateCriticalCase } = useContext(StateDataContext);

  const setStateCritical = (newTotal) => setStateCriticalCase(currentState, newTotal);

  return [criticalCases[currentState], setStateCritical];
}

export function useCurrentStateVentilators() {
  const [currentState] = useCurrentState();
  const { ventilators, setStateVentilators } = useContext(StateDataContext);

  const setVentilators = (newTotal) => setStateVentilators(currentState, newTotal);

  return [ventilators[currentState], setVentilators];
}
