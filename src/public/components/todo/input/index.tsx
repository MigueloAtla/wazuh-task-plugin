import React, { useState } from 'react';
import { i18n } from '@osd/i18n';
import { 
  EuiFieldText,
 } from '@elastic/eui';
 import { Modal } from '../modal';

export const TodoInput = ({ addTodo, http, notifications }) => {

  const [text, setText] = useState('');
  const [finishDate, setFinishDate] = useState(null);
  const [priority, setPriority] = useState(null);
  const [tags, setTags] = useState([]);

  const onCreateHandler = () => {
    const p = {
      finishDate,
      priority,
      text,
      tags
    }
    const data = JSON.stringify(p)
    
    http.get(`/api/custom_plugin/create-task/${data}`).then((res) => {
      console.log(res)
      if(res.statusCode === 201) {
        notifications.toasts.addSuccess(
          i18n.translate('customPlugin.dataUpdated', {
            defaultMessage: `Todo ${text}: created`,
          })
          );
          setText('');
        }
    });
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
        prepend={
          <Modal 
            finishDate={finishDate} 
            setFinishDate={setFinishDate} 
            priority={priority} 
            setPriority={setPriority}
            tags={tags}
            setTags={setTags}
          />
        }
        aria-label="Create new task by pressing enter"
        fullWidth
      />
    </div>
  )
}