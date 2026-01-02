import React from 'react';
import cartStore from './cartStore';

export const StoresContext = React.createContext({
  cartStore,
});

export const StoresProvider = ({children}) => {
  return (
    <StoresContext.Provider value={{cartStore}}>
      {children}
    </StoresContext.Provider>
  )
}

