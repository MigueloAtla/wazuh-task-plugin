import React, { useState } from 'react';
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
  EuiButtonEmpty
} from '@elastic/eui';

import { GroupButtons } from '../groupButtons';
import { TagSelector } from '../tagSelector';

export const Modal = ({ finishDate, setFinishDate, priority, setPriority, tags, setTags }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

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

            <EuiText>End date for this task completion(optional)</EuiText>
            <EuiDatePicker
              showTimeSelect
              selected={finishDate}
              onChange={handleChange}
              onClear={() => handleChange(null)}
              placeholder="Select a date"
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

          <TagSelector tags={tags} setTags={setTags} />
          
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