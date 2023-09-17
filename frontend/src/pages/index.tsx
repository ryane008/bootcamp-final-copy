import { useState } from "react";
import NewPostModal from "@/components/NewPostModal";
import Post from "@/components/Post";
import express from "express";
import {Db, MongoClient, ObjectId} from "mongodb";
import bodyParser from "body-parser";
import ClickyBox from "@/components/ClickyBox";
require("dotenv").config(".env");
import { ScoreCounter } from '@/ScoreCounter';
import { Inter } from 'next/font';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <ScoreCounter>
        <ClickyBox score={1} loadTime={10}/>
        <ClickyBox score={10} loadTime={2000}/>
        <ClickyBox score={50} loadTime={5000}/>
      </ScoreCounter>
      
    </div>
  );
    
 
}


