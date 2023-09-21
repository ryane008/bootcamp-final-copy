import { useState } from "react";
//import NewPostModal from "@/components/NewPostModal";
//import Post from "@/components/Post";
import {Db, MongoClient, ObjectId} from "mongodb";
import bodyParser from "body-parser";
import ClickyBox from "@/components/ClickyBox";
require("dotenv").config(".env");
import ScoreCounter  from '@/components/ScoreCounter';
import { Box, Button } from "@chakra-ui/react";
import './styles.css';
import '@/components/EndGame'
import EndGame from "@/components/EndGame";
//import { Inter } from 'next/font';

//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [count, setCount] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const endGame = () => {
    setGameOver(true);
  };

  const reset = () =>{
    setGameOver(false);
    setCount(0);
  }

  const updateCount = (scoreToAdd:number) => {
    // Update the count based on the scoreToAdd
    if(!gameOver){
      setCount((prevCount) => prevCount + scoreToAdd);
    }
  };

  return (
    <div>
      <h1 className="title-card">Welcome to Clicky Game!!!</h1>
      {gameOver ? (
        <EndGame score={count}/>
      ) : (
        <div>
          <ScoreCounter count={count} />
          <ClickyBox score={1} loadTime={10} updateCount={updateCount} />
          <ClickyBox score={10} loadTime={2000} updateCount={updateCount} />
          <ClickyBox score={50} loadTime={5000} updateCount={updateCount} />
        </div>
      )}
      /*Reset and End game buttons, which should be located at the bottom*/
      <button onClick={reset}>
        Reset Game and Score (data does not save)
      </button>
      {!gameOver && <button onClick={endGame}>End Game</button>}
    </div>
  );
}


