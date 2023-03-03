import React, { useState, useContext } from 'react';
import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiDatePicker, 
  EuiSpacer, 
  EuiFlexItem,
  EuiText,
  EuiButtonIcon,
  EuiFieldText
} from '@elastic/eui';
import moment from 'moment';

// components
import { GroupButtons } from '../groupButtons';
import { TagSelector } from '../tagSelector';

// store
import useStore from '../../store';

// types
import { Todo, HttpActions } from '../../types';

// hooks
import { useHttpActions } from '../../hooks/useHttpActions';

export const EditModal = ({ todo, setTodos }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const todos: Todo[] = useStore(state => state.todos);

  const { updateTask } = useHttpActions()

  const closeModal = () => setIsModalVisible(false);

  const handleUpdateTask = () => {
    // http post to update todo
    const todoObj = {
      text,
      finish_date: finishDate,
      priority,
      tags,
      id: todo.id
    }
    const data = JSON.stringify(todoObj)
    
    updateTask(todoObj, () => {
      const newTodos = todos.map(t => {
        if(t.id === todo.id){
          const finishDate = todoObj.finish_date.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          todoObj.finish_date = finishDate
          return todoObj
        } else {
          return t
        }
      })
      setTodos(newTodos)
    })
    closeModal()
  };
  const showModal = () => setIsModalVisible(true);
  const [finishDate, setFinishDate] = useState(moment(todo.finish_date));
  const [priority, setPriority] = useState(todo.priority);
  const [text, setText] = useState(todo.text);
  const [tags, setTags] = useState(todo.tags);

  const handleChange = (date) => {
    setFinishDate(date);
  };

  let modal;

  const errors = [
    "Here's an example of an error",
    'You might have more than one error, so pass an array.',
  ];

  if (isModalVisible) {
    modal = (
      <EuiModal 
        onClose={closeModal} 
        style={{
          minHeight: '700px', 
          minWidth: '426px'
        }}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Edit the data of this task</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <div>

            <EuiSpacer size="l" />

            <EuiText>Task text:</EuiText>
            <EuiFieldText 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
            />

            <EuiSpacer size="l" />
            
            <EuiText>Finish date:</EuiText>
            {finishDate && <EuiDatePicker
              showTimeSelect
              selected={finishDate}
              onChange={handleChange}
              onClear={() => handleChange(null)}
              placeholder="Clearable"
            />}

          </div>
          <EuiSpacer />

          <EuiFlexItem>
            <EuiText>
              Priority:
            </EuiText>
            <GroupButtons setPriority={setPriority} priority={priority} />
          </EuiFlexItem>

          <EuiSpacer />

          <TagSelector tags={tags} setTags={setTags} />
          
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={handleUpdateTask} fill>
            Save task changes
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

  return (
    <div>
      <EuiButtonIcon 
        legend="Edit task"
        onClick={showModal}
        size="s"
        iconType="pencil"
        aria-label="Edit task"
        />
      {modal}
    </div>
  );
}