/* eslint-disable */
import React, {
  createContext, useState, useEffect,
} from 'react';
import useSettings from 'hooks/useSettings';
import { getAllStateCasesData } from 'services/covid19';
import PropTypes from 'prop-types';
import { getRandomInt } from 'utils/math/getRandomInt';
import state from 'constants/state';
import { orderItems } from 'constants/order';
import { getStatesICUBedData } from 'services/database';
// eslint-disable-next-line
import useOrderActions from 'hooks/useOrderActions';
import { useAllIncomingOrders } from 'hooks/useOrders';

const stateToKey = {};
const stateList = [];
Object.keys(state).forEach((stateKey) => {
  const stateName = state[stateKey];
  stateToKey[stateName] = stateKey;
  stateList.push(stateName);
});


async function getInitialData(critToTotal, ventToIcu) {
  const icuBeds = await getStatesICUBedData();
  const stateData = await getAllStateCasesData();
  const [icuMin, icuMax] = ventToIcu;
  const [critMin, critMax] = critToTotal;

  const totalCases = {};
  const newCases = {};
  const activeCases = {};
  const criticalCases = {};
  const ventilators = {};
  const incomingVentilators = {};

  stateList.forEach((stateName) => {
    const data = stateData[stateName];
    totalCases[stateName] = data.totalCases;
    newCases[stateName] = data.newCases;
    activeCases[stateName] = data.activeCases;
    criticalCases[stateName] = parseInt(
      data.totalCases * getRandomInt(critMax, critMin),
    );
    const ventilator = getRandomInt(parseInt(icuBeds[stateName] * icuMax), parseInt(icuBeds[stateName] * icuMin));
    ventilators[stateName] = ventilator;
  });

  return {
    totalCases,
    newCases,
    activeCases,
    criticalCases,
    ventilators,
    incomingVentilators,
  };
}

function BuildOrder(fromStateName, toStateName, quantity) {
  return ({
    to: stateToKey[toStateName],
    from: stateToKey[fromStateName],
    quantity,
    item: orderItems.VENTILATOR,
    expected_by: [new Date(), 15],
  });
}

// =================== CONTEXT ===================

const StateDataContext = createContext();

export function StateDataProvider({ children }) {
  // =============== SETUP ===============
  const [totalCases, setTotalCases] = useState({});
  const [newCases, setNewCases] = useState({});
  const [criticalCases, setCriticalCases] = useState({});
  const [activeCases, setActiveCases] = useState({});
  const [ventilators, setVentilators] = useState({});
  const [criticalCaseProjected, setCriticalCaseProjected] = useState({});
  const [statesWithExcess, setStatesWithExcess] = useState(new Set());
  const [statesInCritical, setStatesInCritical] = useState(new Set());

  const incomingVentilators = useAllIncomingOrders();

  const stateIncomingVentilators = (stateName) => incomingVentilators[stateName] || 0;


  const [loading, setLoading] = useState(true);
  const {
    ventilatorToIcuPercentage,
    criticalToTotalPercentage,
    projectedTimeline,
  } = useSettings();
  const { addBulkOrders } = useOrderActions();

  const calculateProjectedCritical = (currentCritical, currentActive) => {
    // debugger;
    const rate = (currentCritical / currentActive) + 1;
    let projected = currentCritical;
    for (let i = 0; i < projectedTimeline; i++) {
      projected *= rate;
    }
    return parseInt(projected);
  };

  useEffect(() => {
    async function updateInitialStates() {
      const initialData = await getInitialData(
        criticalToTotalPercentage,
        ventilatorToIcuPercentage,
      );
      const criticalProjection = {};
      const intialStateWithExcess = new Set();
      const initialCriticalStates = new Set();
      stateList.forEach((stateName) => {
        const projectedCritical = calculateProjectedCritical(initialData.criticalCases[stateName], initialData.activeCases[stateName]);
        criticalProjection[stateName] = projectedCritical;
        const extra = initialData.ventilators[stateName] - projectedCritical;
        if (extra > 0) {
          intialStateWithExcess.add(stateName);
        } else if (extra < 0) {
          initialCriticalStates.add(stateName);
        }
      });

      setCriticalCaseProjected(criticalProjection);
      setTotalCases(initialData.totalCases);
      setNewCases(initialData.newCases);
      setCriticalCases(initialData.criticalCases);
      setActiveCases(initialData.activeCases);
      setVentilators(initialData.ventilators);
      setStatesWithExcess(intialStateWithExcess);
      setStatesInCritical(initialCriticalStates);
      setLoading(false);
    }

    updateInitialStates();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(statesWithExcess);
    console.log(statesInCritical);
    if (statesWithExcess.size > 0 && statesInCritical.size > 0) {
      const updatedExcess = new Set([...statesWithExcess]);
      const updatedCritical = new Set([...statesInCritical]);
      const updatedVentilators = { ...ventilators };
      const updatedIncoming = { ...incomingVentilators };
      const orderList = [];

      const currentExcess = (stateName) => {
        const excess = updatedVentilators[stateName] - criticalCaseProjected[stateName];
        return excess > 0 ? excess : 0;
      };

      const orderVentilators = (from, to, count) => {
        // UPDATE FROM VENTIALTORS
        updatedVentilators[from] -= count;
        updatedIncoming[to] += count;
        console.log(`${from} ---> ${to} : ${count}`);
        orderList.push(BuildOrder(from, to, count));
      };

      for (const crit of statesInCritical) {
        // debugger;
        let required = criticalCaseProjected[crit] - (ventilators[crit] + stateIncomingVentilators(crit));
        for (const excessState of updatedExcess) {
          // debugger;
          const excess = currentExcess(excessState);
          if (excess === 0) {
            updatedExcess.delete(excessState);
          } else if (excess < required) {
            // TAKE ALL THEIR EXTRA
            required -= excess;
            updatedExcess.delete(excessState);
            // MAKE THE ORDER
            orderVentilators(excessState, crit, excess);
          } else if (excess >= required) {
            // TAKE ALL THAT IS NEEDED
            orderVentilators(excessState, crit, required);
            // WHEN THE STATE HAS JUST ENOUGH
            if (excess === required) updatedExcess.delete(excessState);
            // DONE WITH CURRENT STATE
            updatedCritical.delete(crit);
            break;
          }
        }
        // IF NO MORE EXTRA
        if (updatedExcess.size === 0) break;
      }
      addBulkOrders(orderList);
      setStatesWithExcess(updatedExcess);
      setStatesInCritical(updatedCritical);
      setVentilators(updatedVentilators);
    }
  }, [statesWithExcess, statesInCritical]);

  // =============== CONTEXT VALUES ===============

  const setStateCriticalCase = async (targetState, newCritCases) => {
    // const expected = criticalCaseProjected[targetState];
    const newCrit = parseInt(newCritCases);
    const newProjection = calculateProjectedCritical(newCrit, activeCases[targetState]);
    setCriticalCaseProjected({
      ...criticalCaseProjected,
      [targetState]: newProjection,
    });

    setCriticalCases({
      ...criticalCases,
      [targetState]: newCrit,
    });

    const totalVentilators = ventilators[targetState] + stateIncomingVentilators(targetState);
    if (totalVentilators < newProjection) {
      setStatesInCritical(new Set([...statesInCritical, targetState]));
    } else if (totalVentilators > newProjection) {
      setStatesWithExcess(new Set([...statesWithExcess, targetState]));
    }
  };

  const setStateVentilators = (targetState, newTotal) => {
    const total = parseInt(newTotal);
    setVentilators({
      ...ventilators,
      [targetState]: total,
    });

    const supplyCount = total + stateIncomingVentilators(targetState);
    const projected = criticalCaseProjected[targetState];
    console.log(`${supplyCount} - ${projected}`);
    if (supplyCount < projected) {
      const newCrit = new Set([...statesInCritical]);
      newCrit.add(targetState);
      setStatesInCritical(newCrit);
    } else if (supplyCount > projected) {
      setStatesWithExcess(new Set([...statesWithExcess, targetState]));
    }
  };

  const values = {
    // DATA
    totalCases,
    newCases,
    criticalCases,
    activeCases,
    ventilators,
    incomingVentilators,
    criticalCaseProjected,
    // ACTIONS
    setStateCriticalCase,
    setStateVentilators,
  };


  // =============== RENDER ===============
  return (
    <StateDataContext.Provider value={values}>
      {loading === true ? (<></>) : children}
    </StateDataContext.Provider>
  );
}

StateDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateDataContext;
