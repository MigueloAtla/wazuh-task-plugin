import React, { useEffect, useState, useMemo} from 'react';
import { 
  EuiFlexGroup, 
  EuiTabs,
  EuiTab,
} from '@elastic/eui';
import { TodoInput } from './input';
import { Table } from './table';
import { VisualizationTabContent } from './chart';

export const TodoApp = ({ http, notifications }) => {
  const [todos, setTodos] = useState([])

  const getTodos = () => {
    http.get(`/api/custom_plugin/get-todos`).then((res) => {
      setTodos(res);
    })
  }

  useEffect(() => {
    getTodos()
  }, [])

  const addTodo = (title) => {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 1;

    const newTodo = {
      id: lastId + 1,
      title,
      completed: false
    }

    const todoList = [...todos]
    todoList.push(newTodo);

    setTodos(todoList);
  }

  const handleSetComplete = (id) => {
    const updatedList = todos.map(todo => {
      if (todo.id === id) {
        const args = {
          id: todo.id,
          completed: todo.completed
        }
        const p = JSON.stringify(args)
        http.put(`/api/custom_plugin/update-todo/${p}`).then((res) => {
          console.log('UPDATED TODO')
        })
        return { ...todo, completed: !todo.completed}
      }
      return todo;
    })

    setTodos(updatedList);
  } 

  const handleClearComplete = () => {
    const updatedList = todos.filter(todo => !todo.completed);
    setTodos(updatedList);
  };

  const handleDelete = (id) => {
    const updatedList = todos.filter(todo => todo.id !== id);
    console.log(id)
    http.delete(`/api/custom_plugin/delete-todo/${id}`).then((res) => {
      console.log('DELETED TODO')
    })
    setTodos(updatedList);
  }

  // Tabs
  const tabs = [
    {
      id: 'todos-tab--id',
      name: 'Tasks',
      content: (
        <TodoTabContent 
          http={http}
          notifications={notifications}
          addTodo={addTodo}
          todos={todos}
          setTodos={setTodos}
          handleSetComplete={handleSetComplete}
          handleDelete={handleDelete}
          handleClearComplete={handleClearComplete}
        />
      ),
    },
    {
      id: 'visualization-tab--id',
      name: 'Visualizations',
      content: (
        <VisualizationTabContent todos={todos}/>
      ),
    },
    
  ];

  // logic for tabs
  const [selectedTabId, setSelectedTabId] = useState('todos-tab--id');
  const selectedTabContent = useMemo(() => {
    return tabs.find((obj) => obj.id === selectedTabId)?.content;
  }, [ selectedTabId, todos ]);

  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        key={index}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
      >
        {tab.name}
      </EuiTab>
    ));
  };

  return (
    <>
      <EuiTabs>{renderTabs()}</EuiTabs>
      {selectedTabContent}
    </>
  );
};

const TodoTabContent = ({ 
  http,
  notifications,
  addTodo,
  todos,
  setTodos,
  handleSetComplete,
  handleDelete,
  handleClearComplete
}) => {
  return (
    <EuiFlexGroup justifyContent='center' style={{margin: '50px'}}>
      <EuiFlexGroup direction='column' style={{gap: '20px'}}>
        <TodoInput 
          addTodo={addTodo} 
          http={http} 
          notifications={notifications} 
          todos={todos}
          setTodos={setTodos}
          />
        <Table 
          http={http}
          todos={todos}
          setTodos={setTodos}
          handleSetComplete={handleSetComplete}
          handleDelete={handleDelete}
          handleClearComplete={handleClearComplete}
          />
      </EuiFlexGroup>
    </EuiFlexGroup>
  )
}