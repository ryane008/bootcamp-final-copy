import { useState } from "react";
//import NewPostModal from "@/components/NewPostModal";
//import Post from "@/components/Post";
import {Db, MongoClient, ObjectId} from "mongodb";
import bodyParser from "body-parser";
import ClickyBox from "@/components/ClickyBox";
import ScoreCounter  from '@/components/ScoreCounter';
import { Box, Button } from "@chakra-ui/react";
import './styles.css';
import '@/components/EndGame'
import EndGame from "@/components/EndGame";
import UserBox from "@/components/UserBox";
import axios from "axios";

//import { Inter } from 'next/font';

//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("Unnamed");
  const [userID, setUserID] = useState(new ObjectId());

  const [gameOver, setGameOver] = useState(false);
  
  const endGame = () => {
    setGameOver(true);
    updatePlayerScore;
  };

  const updatePlayerScore = () => {
    // Make a PATCH request to update the player's score
    axios
      .patch(`/players/${userID}`, {
        score: count // Assuming your API expects the "score" field in the request body
      })
      .then((response) => {
        // Handle success, if needed
        console.log("Score updated successfully");
      })
      .catch((error) => {
        // Handle error, if needed
        console.error("Error updating score:", error);
      });
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

  const updateUser = (name: string) => {
    // Update the count based on the scoreToAdd
    setUsername(name);
  };

  const updateUserID = (id: ObjectId) => {
    setUserID(id);
  }

  return (
    <div>
      <h1 className="title-card">Welcome to Clicky Game!!!</h1>
      <h2 className="title-card">Player: {username}</h2>
      <UserBox updateUser={updateUser} updateID={updateUserID}/>
      {gameOver ? (
        <div>
          <EndGame/>
          <ScoreCounter count={count}/>
          <Button onClick={reset}>
            Reset Game and Score (data does not save)
          </Button>
        </div>
        
      ) : (
        <div>
          <ScoreCounter count={count} />
          <ClickyBox score={1} loadTime={10} updateCount={updateCount} />
          <ClickyBox score={10} loadTime={2000} updateCount={updateCount} />
          <ClickyBox score={50} loadTime={5000} updateCount={updateCount} />
        </div>
      )}
      /*Reset and End game buttons, which should be located at the bottom*/
      {!gameOver && <button onClick={endGame}>End Game</button>}
    </div>
  );
}


