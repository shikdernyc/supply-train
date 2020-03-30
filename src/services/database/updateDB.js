import { setStateICUBedData, getStatesICUBedData } from '.';
import statesICUBedData from './statesICUBeds';

console.log('updating');
setStateICUBedData(statesICUBedData);
// getStatesICUBedData().then(d => console.log({ d }));
