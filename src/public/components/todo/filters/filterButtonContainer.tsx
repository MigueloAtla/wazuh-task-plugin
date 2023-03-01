import React from 'react';

export const FilterButtonContainer: React.FC = ({
  children
}: { children: React.ReactNode }) => {
  return (
      <div className="flex items-center space-x-2">
          {children}
      </div>
  )
};