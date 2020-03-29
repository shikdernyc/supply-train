import Axios from 'axios';

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
    statesData[USAState] = {
      totalCases: parseInt(TotalCases) || 0,
      newCases: parseInt(NewCases) || 0,
      activeCases: parseInt(ActiveCases) || 0,
    };
  });
  return statesData;
}
