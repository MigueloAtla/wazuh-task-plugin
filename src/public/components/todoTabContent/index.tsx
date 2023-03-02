import React from 'react';
import { EuiFlexGroup } from '@elastic/eui';
import { TodoInput } from '../todoInput';
import { Table } from '../table';

export const TodoTabContent = ({ 
  http,
  notifications,
  addTodo,
  // todos,
  // setTodos,
  handleSetComplete,
  handleDelete,
  handleClearComplete
}) => {
  return (
    <EuiFlexGroup justifyContent='center' style={{margin: '50px'}}>
      <EuiFlexGroup direction='column' style={{gap: '20px'}}>
        <TodoInput 
          // addTodo={addTodo} 
          http={http} 
          notifications={notifications} 
          // todos={todos}
          // setTodos={setTodos}
          />
        <Table 
          http={http}
          // todos={todos}
          // setTodos={setTodos}
          handleSetComplete={handleSetComplete}
          handleDelete={handleDelete}
          handleClearComplete={handleClearComplete}
          />
      </EuiFlexGroup>
    </EuiFlexGroup>
  )
}