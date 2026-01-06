import React from 'react';

export default function LoadingState(): React.ReactElement {
  return (
    <div className="flex justify-center items-center h-64">
      <span className="spinner-border text-primary"></span>
    </div>
  );
}