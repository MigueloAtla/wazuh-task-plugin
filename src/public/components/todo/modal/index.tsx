import React, { useState } from 'react';
import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiCodeBlock,
  EuiDatePicker, 
  EuiSpacer, 
  EuiFormRow,
  EuiFlexItem,
  EuiText,
  useGeneratedHtmlId,
  EuiButtonGroup,
  EuiButtonEmpty
} from '@elastic/eui';
import { TAGS } from '../../../constants';

import { GroupButtons } from '../groupButtons';

export const Modal = ({ finishDate, setFinishDate, priority, setPriority, tags, setTags }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  // const [startDate, setStartDate] = useState(null);

  const handleChange = (date) => {
    setFinishDate(date);
  };

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal 
        onClose={closeModal} 
        style={{
          minHeight: '500px', 
          minWidth: '426px'
        }}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add data to your task</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <div>

            <EuiSpacer size="l" />

            <EuiDatePicker
              showTimeSelect
              selected={finishDate}
              onChange={handleChange}
              onClear={() => handleChange(null)}
              placeholder="Clearable"
            />

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
          </EuiFlexItem>
          
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={closeModal} fill>
            Confirm data
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

  return (
    <div>
      <EuiButtonEmpty 
        size="xs" 
        iconType="gear" 
        onClick={showModal}>
          Options
      </EuiButtonEmpty>
      {modal}
    </div>
  );
};