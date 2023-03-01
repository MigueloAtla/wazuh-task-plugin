import React, { useState } from 'react';
import {
  EuiButtonGroup,
  EuiSpacer,
  useGeneratedHtmlId,
} from '@elastic/eui';

export const GroupButtons = ({priority, setPriority}) => {
  // const basicButtonGroupPrefix = useGeneratedHtmlId({
  //   prefix: 'basicButtonGroup',
  // });
  const basicButtonGroupPrefix = `basicButtonGroup-${Math.floor(Math.random() * 1000000000000)}`

  const toggleButtons = [
    {
      id: '0',
      label: 'Hight',
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


  // const [toggleIdSelected, setToggleIdSelected] = useState(
  //   `${basicButtonGroupPrefix}__1`
  // );

  const onChange = (optionId) => {
    console.log(optionId)
    setPriority(optionId);
  };

  return (
    <>
      <EuiButtonGroup 
        isFullWidth
        legend="This is a basic group"
        options={toggleButtons}
        idSelected={priority}
        onChange={(id) => onChange(id)}
      />
      <EuiSpacer size="m" />
    </>
  );
};
