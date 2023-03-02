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
  EuiFormRow,
  EuiFlexItem,
  EuiText,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFieldText
} from '@elastic/eui';
import moment from 'moment';
import { TAGS } from '../../../constants';

import { GroupButtons } from '../groupButtons';

export const EditModal = ({ todo, http }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);

  const updateTask = () => {
    // http post to update todo
    const todoObj = {
      text,
      finishDate,
      priority,
      tags,
      id: todo.id
    }
    console.log(todoObj)
    const data = JSON.stringify(todoObj)
    console.log(data)
    http.put(`/api/custom_plugin/edit-todo/${data}`).then((res) => {
      console.log(res)
    })
    closeModal()
  };
  const showModal = () => setIsModalVisible(true);
  const [finishDate, setFinishDate] = useState(moment(todo.finish_date));
  const [priority, setPriority] = useState(todo.priority);
  const [text, setText] = useState(todo.text);
  const [tags, setTags] = useState(todo.tags);

  useEffect(() => {
    console.log(tags)
  }, [tags])

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
          <EuiModalHeaderTitle>Add data to your task</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <div>

            <EuiSpacer size="l" />

            <EuiFieldText 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
            />

            <EuiSpacer size="l" />

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

          <EuiFlexItem>
            <EuiText>
              Tags:
            </EuiText>
            <>
              {
                TAGS.map((tag, i) => {
                  return (
                    <EuiButtonEmpty 
                      key={tag.name + i}
                      size="s" 
                      style={{
                        backgroundColor: tag.bgcolor,
                        width: 'fit-content',
                        borderRadius: '4px',
                        color: tag.color
                      }} 
                      iconType="tag" 
                      iconSide="left"
                      onClick={() => {
                        if(tags.includes(tag.name)){
                          setTags(tags.filter(t => t !== tag.name))
                        } else {
                          setTags([...tags, tag.name])
                        }
                      }}
                      >
                      {tag.name}
                    </EuiButtonEmpty>
                )})
              }
            </>
          </EuiFlexItem>
          
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