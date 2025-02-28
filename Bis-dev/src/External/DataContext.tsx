import { createContext, useContext, useState, ReactNode } from "react";

export const DataContext = createContext<any>(null);

export const DataProviders = ({ children }: { children: ReactNode }) => {
  const [currentActiveFromButtons, setCurrentActiveFromButtons] =
    useState("HOME");
  return (
    <DataContext.Provider
      value={{ currentActiveFromButtons, setCurrentActiveFromButtons }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
