import { Task, TypeStatus } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { createContext } from "react";

interface DataContextType {
  data: Task[];
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
  addItem: (item: Task) => void;
  deleteItem: (id: string) => void;
  updateStatus: (id: string, status: TypeStatus) => void;
  updateItem: (id: string, update: Partial<Task>) => void;
}

export const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Task[]>(() => {
    const localData = localStorage.getItem("data");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addItem = (item: Task) => {
    setData([...data, item]);
  };

  const deleteItem = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  const updateStatus = (id: string, status: TypeStatus) => {
    setData(data.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const updateItem = (id: string, update: Partial<Task>) => {
    setData(
      data.map((item) => (item.id === id ? { ...item, ...update } : item))
    );
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        addItem,
        deleteItem,
        updateStatus,
        updateItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
