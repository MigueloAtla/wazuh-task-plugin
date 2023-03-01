import React from 'react';

export const FiltersContainer: React.FC = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-700 border-b border-solid border-gray-600">
      {children}
    </div>
  )
};