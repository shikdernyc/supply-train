const covidApi = require('covid19-api');
const util = require('util');

async function getStatesICUBeds() {
  const capacity = await covidApi.getCapacityInfoUSHealthFacilities();
  return capacity;
}

async function run() {
  const result = await getStatesICUBeds();

  console.log(util.inspect(result, { showHidden: false, depth: null }));

  // alternative shortcut
  console.log(util.inspect(result, false, null, true /* enable colors */));

  console.log('Made a change');
}

run();

module.exports = {
  getStatesICUBeds,
};
