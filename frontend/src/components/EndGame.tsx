import { FormEvent, JSX, useState } from "react";
import { Button, Input, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";
import { ObjectId } from "mongodb";

function EndGame(){
    return(
    <Button>
        <h2>Game Over</h2>
    </Button>);
}

export default EndGame;