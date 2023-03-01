import React, { useEffect, useState} from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import { TodoList } from './todoList';
import { TodoInput } from './input';
import { Table } from './table';

export const TodoApp = ({ http }) => {
  const [todos, setTodos] = useState([])
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     title: 'Watch the next Marvel Movie',
  //     completed: false,
  //     tags: ['bugfix', 'enhancement'],
  //     priority: 0
  //   },
  //   {
  //     id: 2,
  //     title: 'Record the next Video',
  //     completed: false,
  //     tags: ['warning'],
  //     priority: 1
  //   },
  //   {
  //     id: 3,
  //     title: 'Wash the dishes',
  //     completed: false,
  //     tags: ['bugfix'],
  //     priority: 1
  //   },
  //   {
  //     id: 4,
  //     title: 'Study 2 hours',
  //     completed: false,
  //     tags: ['enhancement'],
  //     priority: 2
  //   }
  // ])
  
  const [activeFilter, setActiveFilter] = useState('all');

  const [filteredTodos, setFilteredTodos] = useState(todos);

  const getTodos = () => {
    http.get(`/api/custom_plugin/get-todos`).then((res) => {
      // const res_todos = res ? res.map(todo => todo._source) : [];
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
    console.log('UPDATING TODO')
    const updatedList = todos.map(todo => {
      if (todo.id === id) {
        const args = {
          id: todo.id,
          completed: todo.completed
        }
        const p = JSON.stringify(args)
        const completed = todo.completed ? 'false' : 'true'
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

  const showAllTodos = () => {
    setActiveFilter('all')
  }

  const showActiveTodos = () => {
    setActiveFilter('active')
  }

  const showCompletedTodos = () => {
    setActiveFilter('completed')
  }
  
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredTodos(todos);
    } else if (activeFilter === 'active') {
        const activeTodos = todos.filter(todo => todo.completed === false);
        setFilteredTodos(activeTodos);
    } else if (activeFilter === 'completed') {
        const completedTodos = todos.filter(todo => todo.completed === true);
        setFilteredTodos(completedTodos);
    }
    
  },[activeFilter, todos]);

  return (
    <EuiFlexGroup justifyContent='center' style={{margin: '50px'}}>
      <EuiFlexGroup grow={false} direction='column' style={{gap: '20px'}}>
        <TodoInput addTodo={addTodo} http={http}/>
        {/* <TodoList
          activeFilter={activeFilter}
          todos={filteredTodos}
          showAllTodos={showAllTodos}
          showActiveTodos={showActiveTodos}
          showCompletedTodos={showCompletedTodos}
          handleSetComplete={handleSetComplete}
          handleDelete={handleDelete}
          handleClearComplete={handleClearComplete} /> */}
      <Table 
        http={http}
        activeFilter={activeFilter}
        todos={filteredTodos}
        showAllTodos={showAllTodos}
        showActiveTodos={showActiveTodos}
        showCompletedTodos={showCompletedTodos}
        handleSetComplete={handleSetComplete}
        handleDelete={handleDelete}
        handleClearComplete={handleClearComplete}
        />
        </EuiFlexGroup>
    </EuiFlexGroup>
  );
};
