import React from 'react'
import {
  EuiFlexItem,
  EuiText,
  EuiHealth
} from '@elastic/eui';
import { TAGS } from '../../constants';

export const TagSelector = ({ tags, setTags }) => {
  return (
    <EuiFlexItem>
      <EuiText>
        Tags:
      </EuiText>
      <>
        {
          TAGS.map(tag => {
            return (
              <EuiHealth 
                key={tag.name}
                color={tag.bgcolor}
                style={{
                  border: tags.includes(tag.name) && '1px solid rgb(210 241 249)',
                  backgroundColor: tags.includes(tag.name) && 'aliceblue',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if(tags.includes(tag.name)){
                    setTags(tags.filter(t => t !== tag.name))
                  } else {
                    setTags([...tags, tag.name])
                  }
                }}
                >
                {tag.name}
              </EuiHealth>
          )})
        }
      </>
    </EuiFlexItem>
  )
}
