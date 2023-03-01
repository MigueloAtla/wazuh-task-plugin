import React from 'react';

export const ItemsLeft = ({ total }) => {
  return (
    <p className="text-gray-400 text-sm">
        {total} items left
    </p>
  )
};