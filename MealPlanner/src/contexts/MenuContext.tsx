import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

// Create a context
export const MenuContext = createContext();

// Create a provider component
export const MenuProvider = ({children}) => {
  const [menuData, setMenuData] = useState([]);

  const fetchAllMenuData = async () => {
    try {
      const response = await axios.get('http://192.168.1.5:3000/menu/all');
      setMenuData(response.data);
    } catch (err) {
      console.log('error is', err);
    }
  };
  useEffect(() => {
    fetchAllMenuData();
  }, []);

  return (
    <MenuContext.Provider value={{menuData, fetchAllMenuData}}>
      {children}
    </MenuContext.Provider>
  );
};
