import React from 'react';
import Icon from '@material-ui/core/Icon';
import { useCurrentStateNewCases } from 'hooks/useCurrentStateData';
import Input from 'components/Input';
import Button from 'components/Button';
import useInputState from 'hooks/useInputState';
import DataCard from '../DataCard';

export default function() {
  const newCases = useCurrentStateNewCases();

  return <DataCard title='New Cases' Icon={<Icon>group_add</Icon>} color='warning' data={newCases} />;
}
