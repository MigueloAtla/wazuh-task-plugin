import React, { useState } from 'react';
import { 
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFieldText,
  EuiIcon,
  EuiIconTip,
  EuiPopover,
  EuiSpacer,
  EuiSwitch,
  EuiText,
  EuiToolTip,
 } from '@elastic/eui';
 import { Modal } from '../modal';

export const TodoInput = ({ addTodo, http }) => {

  const [text, setText] = useState('');
  const [finishDate, setFinishDate] = useState(null);
  const [priority, setPriority] = useState(null);

  const onCreateHandler = () => {
    // Use the core http service to make a response to the server API.

    const p = {
      finishDate,
      priority,
      text
    }

    const data = JSON.stringify(p)
    
    http.get(`/api/custom_plugin/create-task/${data}`).then((res) => {
    // http.get(`/api/custom_plugin/delete`).then((res) => {
      // setTimestamp(res.time);
      // Use the core notifications service to display a success message.
      setText('');
      // notifications.toasts.addSuccess(
      //   i18n.translate('customPlugin.dataUpdated', {
      //     defaultMessage: 'Todo created',
      //   })
      // );
      console.log(res)
    });
  };
  const handleAddTodo = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      // addTodo(title);
      // create todo to backend
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
          />
        }
        aria-label="Create new task by pressing enter"
        fullWidth
      />
    </div>
  )
}