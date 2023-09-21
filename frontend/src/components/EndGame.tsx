import { FormEvent, JSX, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, Input, Textarea, VStack } from "@chakra-ui/react";

interface Props{
    score: number;
}
function EndGame({score}: Props){
    return(
    <Button>
        <h2>Game Over</h2>
      <p>Your Score: {score}</p>
    </Button>);
}

export default EndGame;