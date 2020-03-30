const covidApi = require('covid19-api');
const util = require('util');

async function getStatesICUBeds() {

  //const capacity = await covidApi.getCapacityInfoUSHealthFacilities();
  const bedsData = await covidApi.getCapacityInfoUSHealthFacilities();
  //console.log(bedsData[0][0].table);

  var hospitals = bedsData[0][0].table;
  var stateICUBeds = {};

  //stateICUBeds["one"] = 1;
  //var statesNumb = 0;

  for(i = 0; i < hospitals.length; i++)
  {
    var fascility = hospitals[i];
    var state = fascility.State;
    var bedsNumber = fascility.StaffedICUBeds;
    bedsNumber = bedsNumber.replace(/['"]+/g, '');
    
    if(bedsNumber === "")
    {
      bedsNumber = 0;
    }
    else
    {
      bedsNumber = parseInt(bedsNumber)||0;
    }

    if(!stateICUBeds.hasOwnProperty(state))
    {
      stateICUBeds[state] = bedsNumber;
    }
    else
    {
      stateICUBeds[state] = stateICUBeds[state] + bedsNumber;
    }
  }

  return stateICUBeds;
  //return capacity;
}

async function run() {
  const result = await getStatesICUBeds();

  console.log(util.inspect(result, { showHidden: false, depth: null }));

  // alternative shortcut
  //console.log(util.inspect(result, false, null, true /* enable colors */));

  console.log('Made a change');
}

run();

module.exports = {
  getStatesICUBeds,
};
