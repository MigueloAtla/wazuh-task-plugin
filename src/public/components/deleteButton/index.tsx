import React from 'react'
import { EuiButtonIcon } from '@elastic/eui'

export const DeleteButton: React.FC<{}> = ({ todo, handleDelete }) => {
  return (
    <EuiButtonIcon 
      legend="Delete task"
      onClick={() => handleDelete(todo.id)}
      size="s"
      iconType="cross"
      aria-label="Delete task"
      />
  )
}