import React from 'react';

export default function LoadingState(): React.ReactElement {
  return (
    <div className="flex justify-center items-center h-64">
     <span className="inline-block h-5 w-5 animate-spin rounded-full 
     border-2 border-solid border-blue-500 border-r-transparent">
     </span>
    </div>
  );
}