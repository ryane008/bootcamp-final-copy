import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';


interface Props{
    count : number;
    children?: React.ReactNode;

}


function ScoreCounter({count, children}:Props){
    const [highscore, setHighscore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      axios.get('/players/highest-score')
    .then((response) => {
      setHighscore(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);
    
  return (
    !isLoading ? <div>
            <h4>High Score: </h4>
            <h4>Your Score: {count}</h4>
        </div> : 
        <div>
            <h4>Loading High Score</h4>
            <h4>Your Score: {count}</h4>	
        </div>
    

  );
};

export default ScoreCounter;

