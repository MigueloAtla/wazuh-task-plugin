import React from 'react'
import { EuiButtonIcon, EuiFlexItem } from '@elastic/eui'

export const CompleteCheckbox = ({ completed, id, handleSetComplete }) => {
  return (
    <EuiFlexItem grow={false}>
      {
        completed ? (
          <EuiButtonIcon 
            onClick={(e) => {
              e.stopPropagation()
              handleSetComplete(id)
            }}
            iconType="stopFilled"
            aria-label="Incomplete"
          />
        )
        : 
        (
          <EuiButtonIcon 
            onClick={(e) => {
              e.stopPropagation()
              handleSetComplete(id)
            }}
            iconType="stop"
            aria-label="Complete"
          />
        )
      }
    </EuiFlexItem>
  )
}