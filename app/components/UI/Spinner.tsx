import React, { ReactNode } from "react";
const Spinner = (): ReactNode => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="relative h-12 w-12 animate-loading">
        <div className="absolute left-0 top-0 h-3 w-3 rounded-full bg-gray-800" />
        <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-gray-800" />
        <div className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-gray-800" />
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-800" />
      </div>
    </main>
  );
};

export default Spinner;
