import React from 'react';
import Icon from '@material-ui/core/Icon';
import DataCard from '../DataCard';
import { useCurrentStateTotalCases } from 'hooks/useCurrentStateData';

export default function() {
  const totalCases = useCurrentStateTotalCases();

  return <DataCard title='Total Cases' Icon={<Icon>person</Icon>} color='info' data={totalCases} />;
}
