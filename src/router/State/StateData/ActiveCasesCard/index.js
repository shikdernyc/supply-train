import React from 'react';
import Icon from '@material-ui/core/Icon';
import { useCurrentStateActiveCases } from 'hooks/useCurrentStateData';
import Input from 'components/Input';
import Button from 'components/Button';
import DataCard from '../DataCard';

export default function() {
  const activeCases = useCurrentStateActiveCases();

  return <DataCard title='Active Cases' Icon={<Icon>person</Icon>} color='warning' data={activeCases} />;
}
