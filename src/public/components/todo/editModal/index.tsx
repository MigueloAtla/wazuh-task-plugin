import React, { useState, useEffect } from 'react';
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
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFieldText
} from '@elastic/eui';
import moment from 'moment';
import { TAGS } from '../../../constants';

import { GroupButtons } from '../groupButtons';
import { TagSelector } from '../tagSelector';

export const EditModal = ({ todo, http, todos, setTodos }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);

  const updateTask = () => {
    // http post to update todo
    const todoObj = {
      text,
      finish_date: finishDate,
      priority,
      tags,
      id: todo.id
    }
    const data = JSON.stringify(todoObj)
    http.put(`/api/custom_plugin/edit-todo/${data}`).then((res) => {

      // update todos with the updated todo
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
          <EuiButton onClick={updateTask} fill>
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