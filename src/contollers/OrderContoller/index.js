import React, { useContext, useEffect, useState } from 'react';
import useOnCriticalCaseChange from 'hooks/useOnCriticalCaseChange';
import useSettings from 'hooks/useSettings';
import useOrderActions from 'hooks/useOrderActions';
import StateDataContext from 'contexts/StateData';
import state from 'constants/state';
import { orderItems } from 'constants/order';
import useIsSetupComplete from 'hooks/useIsSetupComplete';

const stateToKey = {};
Object.keys(state).forEach((stateKey) => {
  stateToKey[[state[stateKey]]] = stateKey;
});

function useOrderController() {
  const [projectedCritical, setProjectedCritical] = useState(null);
  const [criticalStateQueue, setCriticalStateQueue] = useState([]);
  const setupCompleted = useIsSetupComplete();
  const {
    totalCases,
    newCases,
    criticalCases,
    // activeCases,
    ventilators,
    incomingVentilators,
    setStateIncomingVentilators,
    bulkSetStateVentilators,
  } = useContext(StateDataContext);
  const { addBulkOrders } = useOrderActions();
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

  const getStatesTotalVentilators = (stateName) => ventilators[stateName] + (incomingVentilators[stateName] || 0);

  const getSortedStateVentilators = () => {
    const sortedVentilators = Object.keys(ventilators).map((stateName) => ({
      name: stateName,
      ventilators: ventilators[stateName] + incomingVentilators[stateName],
    }));
    sortedVentilators.sort((stateA, stateB) => stateB.ventilators - stateA.ventilators);
    return sortedVentilators;
  };

  function createAnOrder(from, to, quantity) {
    return ({
      to,
      from,
      quantity,
      item: orderItems.VENTILATOR,
      expected_by: [new Date(), 15],
    });
  }

  const orderVentilatorsForState = (stateName, total) => {
    const orderList = [];
    const ventilatorUpdateList = [];
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
          orderList.push(createAnOrder(currentStateKey, targetStateKey, required));
          required = 0;
          ventilatorUpdateList.push({
            name: stateData.name,
            newTotal: ventilators[stateData.name] - required,
          });
          break;
        } else {
          const excess = totalStateVentilators - stateProjectedCrit;
          ventilatorUpdateList.push({
            name: stateData.name,
            newTotal: ventilators[stateData.name] - excess,
          });
          orderList.push(createAnOrder(currentStateKey, targetStateKey, excess));
          required -= excess;
        }
      }
    }
    bulkSetStateVentilators(ventilatorUpdateList);
    addBulkOrders(orderList);
    setStateIncomingVentilators(stateName, total - required);
  };

  // ============================ CONTROLLERS ============================

  useEffect(() => {
    const stateKeys = Object.keys(criticalCases);
    if (setupCompleted) {
      // INITIAL STATE SET
      const stateRequiresVentilators = [];
      const updatedProjections = {};
      stateKeys.forEach((stateName) => {
        const stateProjected = calcCritcalProjectedForState(stateName);
        const currentVentilators = getStatesTotalVentilators(stateName);
        console.log(`${stateName}: ${currentVentilators} --> ${stateProjected}`);
        updatedProjections[stateName] = stateProjected;
        if (currentVentilators < stateProjected) {
          stateRequiresVentilators.push({
            stateName,
            orderCount: stateProjected - currentVentilators,
          });
        }
      });
      setCriticalStateQueue(stateRequiresVentilators);
      setProjectedCritical(updatedProjections);
    }
  }, [setupCompleted]);

  useEffect(() => {
    if (projectedCritical) {
      criticalStateQueue.forEach(({ stateName, orderCount }) => {
        orderVentilatorsForState(stateName, orderCount);
      });
    }
  }, [projectedCritical]);

  useOnCriticalCaseChange((state, prevCritCase, newCritCase) => {
    const updatedProjection = calcCritcalProjectedForState(state, newCritCase);
    const currentVentilators = getStatesTotalVentilators(state);
    if (currentVentilators < updatedProjection) {
      orderVentilatorsForState(state, updatedProjection - currentVentilators);
    }
  });

  // return <></>;
}

export default useOrderController;
