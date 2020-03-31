import state from 'constants/state';
import { firestore } from '../firebase';

const icuBedsDoc = firestore.doc('data/icu_beds');

export function setStateICUBedData(data) {
  return icuBedsDoc.set(data);
}

export async function getStatesICUBedData() {
  const result = (await icuBedsDoc.get()).data();
  const formattedResult = {};
  Object.keys(result).forEach((stateKey) => {
    const stateName = state[stateKey];
    formattedResult[stateName] = result[stateKey];
  });
  return formattedResult;
}
