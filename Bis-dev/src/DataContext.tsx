import React, { createContext, useContext, useState, ReactNode } from "react";

// Create the context with a default value
const DataContext = createContext<
  { data: any; setDataa: React.Dispatch<React.SetStateAction<any>> } | undefined
>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
  initialData: any; // Pass the user data as a prop
}

export const DataProvider: React.FC<DataProviderProps> = ({
  children,
  initialData,
}) => {
  const [data, setDataa] = useState<any>(initialData); // Use the passed user data

  return (
    <DataContext.Provider value={{ data, setDataa }}>
      {children}
    </DataContext.Provider>
  );
};
