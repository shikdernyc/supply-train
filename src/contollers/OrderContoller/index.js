import React, { useContext, useEffect, useState } from 'react';
import useOnCriticalCaseChange from 'hooks/useOnCriticalCaseChange';
import useSettings from 'hooks/useSettings';
import useOrderActions from 'hooks/useOrderActions';
import StateDataContext from 'contexts/StateData';
import state from 'constants/state';
import { orderItems } from 'constants/order';


const stateToKey = {};
Object.keys(state).forEach((stateKey) => {
  stateToKey[[state[stateKey]]] = stateKey;
});

function OrderController() {
  const [projectedCritical, setProjectedCritical] = useState(null);

  const {
    totalCases,
    newCases,
    criticalCases,
    // activeCases,
    ventilators,
    incomingVentilators,
    setStateVentilators,
    setStateIncomingVentilators,
  } = useContext(StateDataContext);
  const { addOrder } = useOrderActions();
  const settings = useSettings();

  // ============================ HELPERS ============================
  const calcCritcalProjectedForState = (stateName, useCritical = null) => {
    const { projectedTimeline } = settings;
    const critical = useCritical !== null ? useCritical : criticalCases[stateName];
    // console.log(criticalCases[stateName]);
    // debugger;
    const current = totalCases[stateName];
    const rate = newCases[stateName];
    // console.log(rate)
    const projectedTotal = current + rate * projectedTimeline;
    // console.log(projectedTotal);
    const criticalPercentage = critical / totalCases[stateName];
    return parseInt(projectedTotal * criticalPercentage);
  };

  const getStatesTotalVentilators = (stateName) => ventilators[stateName] + incomingVentilators[stateName];

  const getSortedStateVentilators = () => {
    const sortedVentilators = Object.keys(ventilators).map((stateName) => ({
      name: stateName,
      ventilators: ventilators[stateName] + incomingVentilators[stateName],
    }));
    sortedVentilators.sort((stateA, stateB) => stateB.ventilators - stateA.ventilators);
    return sortedVentilators;
  };

  function createAnOrder(from, to, quantity) {
    addOrder({
      to,
      from,
      quantity,
      item: orderItems.VENTILATOR,
      expected_by: [new Date(), 15],
    });
  }

  const orderVentilatorsForState = (stateName, total) => {
    let required = total;
    const targetStateKey = stateToKey[stateName];
    const sortedVentilators = getSortedStateVentilators();
    // eslint-disable-next-line no-restricted-syntax
    for (const stateData of sortedVentilators) {
      const stateProjectedCrit = projectedCritical[stateData.name];
      // eslint-disable-next-line no-continue
      if (stateData.name === stateName) continue; // IGNORE IF IS STATE
      const totalStateVentilators = getStatesTotalVentilators(stateData.name);
      // IF THERE'S EXCESS
      if (totalStateVentilators > stateProjectedCrit) {
        const currentStateKey = stateToKey[stateData.name];
        if (totalStateVentilators > required) {
          createAnOrder(currentStateKey, targetStateKey, required);
          required = 0;
          setStateVentilators(stateData.name, ventilators[stateData.name] - required);
          break;
        } else {
          const excess = totalStateVentilators - stateProjectedCrit;
          setStateVentilators(stateData.name, ventilators[stateData.name] - excess);
          createAnOrder(currentStateKey, targetStateKey, excess);
          required -= excess;
        }
      }
    }

    setStateIncomingVentilators(stateName, total - required);
  };

  // ============================ CONTROLLERS ============================

  useEffect(() => {
    const stateKeys = Object.keys(criticalCases);
    if (projectedCritical === null && stateKeys.length > 0) {
      // INITIAL STATE SET
      const updatedProjections = {};
      stateKeys.forEach((stateName) => {
        updatedProjections[stateName] = calcCritcalProjectedForState(stateName);
      });
      setProjectedCritical(updatedProjections);
    }
  }, [criticalCases]);

  useOnCriticalCaseChange((state, prevCritCase, newCritCase) => {
    const updatedProjection = calcCritcalProjectedForState(state, newCritCase);
    const currentVentilators = getStatesTotalVentilators(state);
    if (currentVentilators < updatedProjection) {
      orderVentilatorsForState(state, updatedProjection - currentVentilators);
    }
  });

  return <></>;
}

export default OrderController;
