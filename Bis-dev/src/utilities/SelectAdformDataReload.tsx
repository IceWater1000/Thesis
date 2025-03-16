import React, { createContext, ReactNode, useContext, useState } from "react";

export const dataContext = createContext<any>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [SelectReload, SetSelectReload] = useState(false);

  return (
    <dataContext.Provider value={{ SelectReload, SetSelectReload }}>
      {children}
    </dataContext.Provider>
  );
};
export const useSelectAddformReload = () => useContext(dataContext);
