import React, { createContext, useState, useEffect } from 'react';
import useSettings from 'hooks/useSettings';
import { getAllStateCasesData } from 'services/covid19';
import PropTypes from 'prop-types';
import { getRandomInt } from 'utils/math/getRandomInt';

const StateDataContext = createContext();

export function StateDataProvider({ children }) {
  // =============== SETUP ===============
  const [totalCases, setTotalCases] = useState({});
  const [newCases, setNewCases] = useState({});
  const [criticalCases, setCriticalCases] = useState({});
  const [activeCases, setActiveCases] = useState({});
  const [locations, setLocations] = useState({});
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
      const updatedInitialLocations = {};
      const updatedVentilators = {};
      const updatedIncomingVentilators = {};
      // POPULATE EACH COLUMN
      const states = Object.keys(stateData);
      states.forEach((stateName) => {
        const data = stateData[stateName];
        updatedTotal[stateName] = data.totalCases;
        updatedNewCases[stateName] = data.newCases;
        updatedActiveCases[stateName] = data.activeCases;
        updatedCriticalCases[stateName] = parseInt(data.totalCases * criticalToTotalPercentage);
        updatedInitialLocations[stateName] = [0, 0];
        updatedVentilators[stateName] = getRandomInt(updatedCriticalCases[stateName] * 3);
        updatedIncomingVentilators[stateName] = 0;
      });
      // UPDATING STATES
      setTotalCases(updatedTotal);
      setNewCases(updatedNewCases);
      setCriticalCases(updatedCriticalCases);
      setActiveCases(updatedActiveCases);
      setLocations(updatedInitialLocations);
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
  const notifySubscribers = (state, prevCriticalCases, newCriticalCases) => {
    Array.from(criticalCaseSubscribers)
      .forEach((subscriber) => subscriber(state, prevCriticalCases, newCriticalCases));
  };

  // =============== CONTEXT VALUES ===============

  const setStateCriticalCase = (state, newCritCases) => {
    const prevCases = criticalCases[state];
    setCriticalCases({
      ...criticalCases,
      [state]: newCritCases,
    });
    notifySubscribers(state, prevCases, newCritCases);
  };

  const setStateVentilators = (state, newTotal) => {
    setVentilators({
      ...ventilators,
      [state]: newTotal,
    });
  };

  const setStateIncomingVentilators = (state, newTotal) => {
    setIncomingVentilators({
      ...incomingVentilators,
      [state]: newTotal,
    });
  };

  const values = {
    // DATA
    totalCases,
    newCases,
    criticalCases,
    activeCases,
    locations,
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
