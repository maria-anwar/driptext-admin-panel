// components/Loading.tsx
import React from 'react';

const Loading= () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <div className="animate-spin h-20 w-20 border-t-4 border-blue-500 border-solid rounded-full"></div>
    </div>
  );
};

export default Loading;