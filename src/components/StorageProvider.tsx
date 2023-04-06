import React, { createContext, useContext } from 'react';
import { SQLite, SQLiteObject } from '@ionic-enterprise/secure-storage';

interface Context {
  openDatabase: () => Promise<SQLiteObject>;
}

interface Props {
  children?: React.ReactNode;
}

const StorageContext = createContext<Context|undefined>(undefined);

export const StorageProvider: React.FC<Props> = ({ children }) => {
  const openDatabase = async () => {
    try {
      const newDB = await SQLite.create({
        name: 'mydb',
        location: 'default',
        key: 'password'
      });
      return newDB;
    } catch (e) {
      throw e;
    }
  };

  return (
    <StorageContext.Provider value={{ openDatabase }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorageProvider must be used within StorageProvider');
  }
  return context;
}