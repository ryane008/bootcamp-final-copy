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
import LoadingBar from "./LoadingBar";

interface Props {
    score: number;
    loadTime: number;
  }

const ClickyBox = ({score, loadTime}:Props) =>{
    return (<div style={{ border: '1px solid #ccc', padding: '20px', display: 'inline-block' }}>
        <h2>+{score}</h2>
        <LoadingBar duration={loadTime}/>
    </div>
    );
}

export default ClickyBox;