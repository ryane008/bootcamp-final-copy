import React, { createContext, useState, useContext } from 'react';

interface ContextProps {
    count: number;
    toAdd: number;
}
const CountContext = createContext({ count: 0, toAdd});

interface Props{
    children: number;
    toAdd: number;
}

const ScoreCounter = ({children, toAdd} : Props) => {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, toAdd}}>
      {children}
    </CountContext.Provider>
  );
};

export { ScoreCounter, CountContext };
