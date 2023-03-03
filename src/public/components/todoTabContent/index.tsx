import React from 'react';
import { EuiFlexGroup } from '@elastic/eui';
import { TodoInput } from '../input';
import { Table } from '../table';

interface TodoTabContentProps {
  http: any;
  notifications: any;
  addTodo: any;
  handleSetComplete: any;
  handleDelete: any;
  handleClearComplete: any;
}

export const TodoTabContent: React.FC<TodoTabContentProps> = ({ 
  // handleDelete,
}) => {
  
  return (
    <EuiFlexGroup justifyContent='center' style={{margin: '50px'}}>
      <EuiFlexGroup direction='column' style={{gap: '20px'}}>
        <TodoInput />
        <Table />
      </EuiFlexGroup>
    </EuiFlexGroup>
  )
}