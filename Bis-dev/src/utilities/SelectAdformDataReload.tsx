import React, { createContext, ReactNode, useContext, useState } from "react";

export const dataContext = createContext<any>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [Reload, SetReload] = useState(false);

  return (
    <dataContext.Provider value={{ Reload, SetReload }}>
      {children}
    </dataContext.Provider>
  );
};
export const useData = () => useContext(dataContext);
