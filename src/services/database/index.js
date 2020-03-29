import { firestore } from '../firebase';

const icuBedsDoc = firestore.doc('data/icu_beds');

export function setStateICUBedData(data) {
  return icuBedsDoc.set(data);
}

export async function getStatesICUBedData() {
  return (await icuBedsDoc.get()).data();
}
