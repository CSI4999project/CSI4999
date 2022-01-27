import React, { createContext, useContext } from 'react';

const Crypto = createContext()

const CryptoContext = ({children}) => {
  return (
      <Crypto.Provider>{children}</Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
};
