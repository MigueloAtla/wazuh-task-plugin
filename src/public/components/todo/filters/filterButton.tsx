import React from 'react';
import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '@elastic/eui';

export const FilterButton = ({ action, active, filter }) => {
  return (
    <EuiButtonEmpty
      color={active.toLowerCase().includes(filter.toLowerCase()) ? 'text' : 'primary'}
      onClick={action}
    >
      {filter}
    </EuiButtonEmpty>
  )
}