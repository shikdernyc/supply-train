# Supply Train

## Getting started
1. Install required dependencies: `yarn install`
2. Update `src/services/firebase/index.js` with your firebase configs
3. Run server: `yarn start`


## Assumptions
* We did not have data to know how many ventilators each states had but we do know how many ICU beds each states have. We made an assumption that 20-50 percent of ICU beds in each states have access to a ventilators
* We did not know how many cases from each states requires ventilators, thus we made an assumption that 3 to 5 percent of active cases requires ventilators.
* Algorithms for how supplies are distributed can be found in `contexts/StateData`


## Links:
- API for Hospital Data and Real Time Case: https://covid19-server.chrismichael.now.sh/api/v1
- UI Kit Used: https://github.com/creativetimofficial/material-dashboard-react