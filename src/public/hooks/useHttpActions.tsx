import React, { useContext } from 'react';
import { i18n } from '@osd/i18n';
import { CoreContext } from '../context';
import useStore from '../store';
import { Todo, CoreContextProps } from '../types';

export const useHttpActions = () => {
  const todos: Todo[] = useStore(state => state.todos);
  const setTodos = useStore(state => state.setTodos);

  const { http, notifications }: CoreContextProps = React.useContext(CoreContext);

  const getTodos = async (): Promise<void> => {
    http.get(`/api/custom_plugin/get-todos`).then((res: any) => {
      setTodos(res);
    })
  }
  const init = async (): Promise<void> => {
    // if index "todos" does not exist, create it,
    // and bulk insert some data into it 
    http.post(`/api/custom_plugin/init`).then((res) => {
      getTodos()
    })
  }
  const createTask = async (new_task: any, callback: () => void): Promise<void> => {
    const data: string = JSON.stringify(new_task)
    http.get(`/api/custom_plugin/create-task/${data}`).then((res: any) => {

      if(res.statusCode === 201) {
        notifications.toasts.addSuccess(
          i18n.translate('customPlugin.dataUpdated', {
            defaultMessage: `Todo ${new_task.text}: created`,
          })
        );
        callback();
      }
    });
  }

  const handleSetComplete = async (id: string): Promise<void> => {

    const updatedList: Todo[] = todos.map(todo => {
      if (todo.id === id) {
        const args = {
          id: todo.id,
          completed: todo.completed
        }
        const p: string = JSON.stringify(args)
        http.put(`/api/custom_plugin/update-todo/${p}`).then((res: any) => {
        })
        return { ...todo, completed: !todo.completed}
      }
      return todo;
    })

    setTodos(updatedList);
  }

  const handleDelete = async (id: string): Promise<void> => {
    const updatedList: Todo[] = todos.filter(todo => todo.id !== id);
    http.delete(`/api/custom_plugin/delete-todo/${id}`).then((res) => {
    })
    setTodos(updatedList);
  }

  const updateTask = async (todoObj, callback) => {
    const data = JSON.stringify(todoObj)
    http.put(`/api/custom_plugin/edit-todo/${data}`).then((res) => {

      // update todos with the updated todo
      callback();
    })
  }
  

  return { init, createTask, handleSetComplete, handleDelete, getTodos, updateTask }
}