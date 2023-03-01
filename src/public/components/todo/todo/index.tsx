import React, { useState } from 'react';
import { EuiButton, EuiFieldText, EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import {
  EuiBadge,
  EuiSwitch,
  EuiText,
  EuiTitle,
} from '@elastic/eui';

export const Todo = ({ todo, handleSetComplete, handleDelete }: any) => {

  const { id, text, completed, tags } = todo;
  const [ edit, setEdit ] = useState(false);

  return (
    <EuiFlexGroup 
      style={{
        height: '60px',
        margin: 0,
        border: '1px solid #d3dae6',
        borderRadius: '5px',
      }}
    >
      <EuiFlexGroup
      style={{
        height: '60px',
        margin: 0,
      }}>
        <EuiFlexItem grow={false}>
          {
            completed ? (
              <EuiButtonIcon 
                onClick={() => handleSetComplete(id)}
                iconType="cross"
                aria-label="Incomplete"
              />
            )
            : 
            (
              <EuiButtonIcon 
                onClick={() => handleSetComplete(id)}
                iconType="check"
                aria-label="Complete"
              />
            )
          }
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ flexDirection: 'row' }}>
        
          {
            !edit ? 
            <p onClick={() => {
              setEdit(true)
              }}>
                {text}
              </p>
            : 
              <>
                <EuiFieldText type="text" value={text} onChange={(e) => {
                  console.log(e.target.value)
                }} />
                <span onClick={() => {setEdit(false)}}>x</span>
              </>
          }
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup justifyContent='flexEnd' style={{
        height: '60px',
        margin: 0
      }}>
        <EuiFlexGroup grow={false} direction='row' justifyContent='flexEnd' style={{ margin: 0 }}>
        {
          tags && tags.map(tag => (
            <EuiFlexItem grow={false} key={tag}>
              <EuiBadge color={'primary'}>{tag}</EuiBadge>
            </EuiFlexItem>
        ))
        }
        </EuiFlexGroup>
        <EuiFlexItem grow={false}>
        <EuiButtonIcon 
          legend="Delete task"
          onClick={() => handleDelete(id)}
          size="s"
          iconType="cross"
          aria-label="Delete task"
        />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexGroup>
  );
}