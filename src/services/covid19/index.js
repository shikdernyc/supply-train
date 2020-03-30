import Axios from 'axios';
import { getRandomInt } from 'utils/math/getRandomInt';

export async function getAllStateCasesData() {
  const queryData = await Axios.get('https://covid19-server.chrismichael.now.sh/api/v1/CasesInAllUSStates');
  const result = queryData.data.data[0].table;
  const statesData = {};

  result.forEach(({
    USAState,
    TotalCases,
    NewCases,
    ActiveCases,
  }) => {
    const totalCases = parseInt(TotalCases.replace(/,/g, '')) || 0;
    statesData[USAState] = {
      totalCases,
      newCases: parseInt(NewCases.replace(/,/g, '')) || getRandomInt(totalCases / 4),
      activeCases: parseInt(ActiveCases.replace(/,/g, '')) || totalCases / 2,
    };
  });
  return statesData;
}
