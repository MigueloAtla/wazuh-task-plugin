import React, { useState } from 'react'
import { EuiPopover, EuiButtonEmpty, EuiHealth, EuiFlexItem } from '@elastic/eui'
import { TAGS } from '../../../constants';

export const TagsWithPopover = ({ tags }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () =>
  setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
  
  const getTagColor = (tag) => {
    let bgcolor = null
    TAGS.forEach((tag_obj) => {
      if(tag_obj.name === tag) bgcolor = tag_obj.bgcolor
    }) 
    return bgcolor
  }
  
  return (
    <EuiFlexItem grow={false}>
      <EuiPopover
        button={
          <EuiButtonEmpty
            iconType="questionInCircle"
            iconSide="right"
            onClick={onButtonClick}
          >
            <div>
          {
            tags && tags.map((tag) => <EuiHealth key={tag} color={getTagColor(tag)} />)
          }
        </div>
          </EuiButtonEmpty>
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        anchorPosition="downCenter"
      >
        {
          tags && tags.map((tag) => {
            return <div key={tag}>
              <EuiHealth color={getTagColor(tag)}>{tag}</EuiHealth>
            </div>
          })
        }
      </EuiPopover>
    </EuiFlexItem>
  )
}