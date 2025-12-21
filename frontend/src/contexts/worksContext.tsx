"use client";

import React, { createContext } from "react";

const WorksContext = createContext<null>(null);

export function WorksProvider({ children }: { children: React.ReactNode }) {
  const value = null;

  return (
    <WorksContext.Provider value={value}>{children}</WorksContext.Provider>
  );
}

export function useWorksContext() {
  const context = React.useContext(WorksContext);
  if (!context) {
    throw new Error("useWorksContext must be used within WorksProvider");
  }
  return context;
}