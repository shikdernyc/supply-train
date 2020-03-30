const fs = require('fs');
const getStatesICUBeds = require('./data_formatter').getStatesICUBeds;

(async () => {
  const json = await getStatesICUBeds();
  fs.writeFileSync('./statesICUBeds.json', JSON.stringify(json));
})();
