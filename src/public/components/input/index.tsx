import React, { useState, useContext } from 'react';
import { i18n } from '@osd/i18n';
import { 
  EuiFieldText,
 } from '@elastic/eui';
 import { Modal } from '../modal';
import useStore from '../../store';
import {Todo} from '../../types';
// import { CoreContext } from '../../context';
import { useHttpActions } from '../../hooks/useHttpActions';

export const TodoInput = () => {
  const { createTask } = useHttpActions();

  const [text, setText] = useState('');
  const [finishDate, setFinishDate] = useState<string>(null);
  const [priority, setPriority] = useState(null);
  const [tags, setTags] = useState([]);
  const todos = useStore(state => state.todos);
  const setTodos = useStore(state => state.setTodos);

  // const core = useContext(CoreContext);
  // const { http, notifications } = core;

  const onCreateHandler = () => {
    const new_task = {
      finish_date: finishDate,
      priority,
      text,
      tags,
      created_at: new Date().toISOString()
    }
    // const data = JSON.stringify(p)
    // console.log('before create', data)

    createTask(new_task, () => {
      setText('');
      setFinishDate(null)
      setPriority(null)
      const finishDateFormated = new_task.finish_date && new_task.finish_date.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      new_task.finish_date = finishDateFormated
      const todoList = [...todos, new_task];
      setTodos(todoList)
    })
    
    // http.get(`/api/custom_plugin/create-task/${data}`).then((res) => {
    //   if(res.statusCode === 201) {
    //     notifications.toasts.addSuccess(
    //       i18n.translate('customPlugin.dataUpdated', {
    //         defaultMessage: `Todo ${text}: created`,
    //       })
    //     );
    //     setText('');
    //     setFinishDate(null)
    //     setPriority(null)
    //     const finishDateFormated = p.finish_date && p.finish_date.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    //     p.finish_date = finishDateFormated
    //     const todoList = [...todos, p];
    //     setTodos(todoList)
    //   }
    // });
  };
  const handleAddTodo = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      onCreateHandler();
    }
  }

  return (
    <div>
      <EuiFieldText
        placeholder="New task"
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handleAddTodo(e)}
        data-testid="create-todo-input"
        prepend={
          <Modal 
            finishDate={finishDate} 
            setFinishDate={setFinishDate} 
            priority={priority} 
            setPriority={setPriority}
            tags={tags}
            setTags={setTags}
            data-testid="create-todo-modal"
          />
        }
        aria-label="Create new task by pressing enter"
        fullWidth
      />
    </div>
  )
}