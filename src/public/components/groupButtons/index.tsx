import React from 'react';
import {
  EuiButtonGroup,
  EuiSpacer,
} from '@elastic/eui';

export const GroupButtons = ({priority, setPriority}) => {
  const toggleButtons = [
    {
      id: '0',
      label: 'High',
    },
    {
      id: '1',
      label: 'Medium',
    },
    {
      id: '2',
      label: 'Low',
    },
  ];

  const onChange = (optionId) => {
    setPriority(optionId);
  };

  return (
    <>
      <EuiButtonGroup 
        isFullWidth
        legend="Group of priority options"
        options={toggleButtons}
        idSelected={priority}
        onChange={(id) => onChange(id)}
      />
      <EuiSpacer size="m" />
    </>
  );
};
