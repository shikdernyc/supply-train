import { useContext } from 'react';
import StateDataContext from 'contexts/StateData';

export default function useStateData(stateName) {
  const {
    totalCases,
    newCases,
    criticalCases,
    activeCases,
    ventilators,
    incomingVentilators,
  } = useContext(StateDataContext);

  return {
    totalCases: totalCases[stateName],
    criticalCases: criticalCases[stateName],
    ventilators: ventilators[stateName],
    incomingVentilators: incomingVentilators[stateName],
    activeCases: activeCases[stateName],
    newCases: newCases[stateName],
  };
}
