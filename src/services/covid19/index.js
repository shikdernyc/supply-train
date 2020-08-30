/* eslint-disable */

import Axios from 'axios';
import { getRandomInt } from 'utils/math/getRandomInt';
import states from 'constant/state'

export async function getAllStateCasesData() {
  const statesData = {};

  for (let stateName of Object.values(states)) {
    statesData[stateName] = {
      totalCases: 1000,
      newCases: 123123,
      activeCases: 123123
    }
  }
  return statesData;
}
