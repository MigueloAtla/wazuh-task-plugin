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

import { GroupButtons } from '../groupButtons';

export const Modal = ({ finishDate, setFinishDate, priority, setPriority }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  // const [startDate, setStartDate] = useState(null);

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