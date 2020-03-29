import React, { createContext, useState, useEffect } from 'react';
import useSettings from 'hooks/useSettings';
import { getAllStateCasesData } from 'services/covid19';
import PropTypes from 'prop-types';
import { getRandomInt } from 'utils/math/getRandomInt';
import state from 'constants/state';

const StateDataContext = createContext();

export function StateDataProvider({ children }) {
  // =============== SETUP ===============
  const [totalCases, setTotalCases] = useState({});
  const [newCases, setNewCases] = useState({});
  const [criticalCases, setCriticalCases] = useState({});
  const [activeCases, setActiveCases] = useState({});
  const [ventilators, setVentilators] = useState({});
  const [incomingVentilators, setIncomingVentilators] = useState({});
  const settings = useSettings();

  useEffect(() => {
    async function updateInitialStates() {
      const { criticalToTotalPercentage } = settings;
      const stateData = await getAllStateCasesData();
      // INIT COLUMNS
      const updatedTotal = {};
      const updatedNewCases = {};
      const updatedActiveCases = {};
      const updatedCriticalCases = {};
      const updatedVentilators = {};
      const updatedIncomingVentilators = {};
      // POPULATE EACH COLUMN
      const states = Object.values(state);
      states.forEach((stateName) => {
        const data = stateData[stateName] || 0;
        updatedTotal[stateName] = data.totalCases || 0;
        updatedNewCases[stateName] = data.newCases || 0;
        updatedActiveCases[stateName] = data.activeCases
        || 0;
        updatedCriticalCases[stateName] = parseInt(data.totalCases * criticalToTotalPercentage)
        || 0;
        updatedVentilators[stateName] = getRandomInt(updatedCriticalCases[stateName] * 3) || 0;
        updatedIncomingVentilators[stateName] = 0;
      });
      // UPDATING STATES
      setTotalCases(updatedTotal);
      setNewCases(updatedNewCases);
      setCriticalCases(updatedCriticalCases);
      setActiveCases(updatedActiveCases);
      setVentilators(updatedVentilators);
      setIncomingVentilators(updatedIncomingVentilators);
    }

    updateInitialStates();
    // eslint-disable-next-line
  }, []);

  // =============== SUBSCRIBERS ===============
  const criticalCaseSubscribers = new Set();
  const onCriticalCaseChange = (fn) => criticalCaseSubscribers.add(fn);
  const removeOnCriticalCaseChange = (fn) => criticalCaseSubscribers.delete(fn);
  const notifySubscribers = (targetState, prevCriticalCases, newCriticalCases) => {
    Array.from(criticalCaseSubscribers)
      .forEach((subscriber) => subscriber(targetState, prevCriticalCases, newCriticalCases));
  };

  // =============== CONTEXT VALUES ===============

  const setStateCriticalCase = (targetState, newCritCases) => {
    const prevCases = criticalCases[targetState];
    setCriticalCases({
      ...criticalCases,
      [targetState]: newCritCases,
    });
    notifySubscribers(targetState, prevCases, newCritCases);
  };

  const setStateVentilators = (targetState, newTotal) => {
    setVentilators({
      ...ventilators,
      [targetState]: newTotal,
    });
  };

  const setStateIncomingVentilators = (targetState, newTotal) => {
    setIncomingVentilators({
      ...incomingVentilators,
      [targetState]: newTotal,
    });
  };

  const values = {
    // DATA
    totalCases,
    newCases,
    criticalCases,
    activeCases,
    ventilators,
    incomingVentilators,
    // ACTIONS
    setStateCriticalCase,
    setStateVentilators,
    setStateIncomingVentilators,
    // LISTENERS
    onCriticalCaseChange,
    removeOnCriticalCaseChange,
  };

  // =============== RENDER ===============
  return (
    <StateDataContext.Provider value={values}>
      {children}
    </StateDataContext.Provider>
  );
}

StateDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateDataContext;
