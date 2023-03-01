import React from 'react';
import { Todo } from '../todo/index';
import { TodoListProps } from '../types';
import { Filters } from '../filters';
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

export const TodoList = ({
  todos,
  activeFilter,
  handleSetComplete,
  handleDelete,
  handleClearComplete,
  showAllTodos,
  showActiveTodos,
  showCompletedTodos }: TodoListProps ) => {
  return (
    // <EuiFlexGroup direction='column' style={{ gap: '20px'}}>
      <>
        {todos.map(todo => (
            <Todo key={todo.id} todo={todo} handleSetComplete={handleSetComplete} handleDelete={handleDelete} />
        )
        )}
        <Filters
          activeFilter={activeFilter}
          total={todos.length}
          showAllTodos={showAllTodos}
          showActiveTodos={showActiveTodos}
          showCompletedTodos={showCompletedTodos}
          handleClearComplete={handleClearComplete} />
      </>
    // </EuiFlexGroup>
  )
}