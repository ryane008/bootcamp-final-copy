import express from "express";
import {Db, MongoClient, ObjectId} from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config(".env");

const app = express();
const port = 8080; // default port to listen
let db: Db;

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Route definitions

// TODO: Implement a route handler that returns a list of all posts, ordered by date created.
app.get("/players", async (req, res) => {
    // res.send("TODO: GET /posts");
    const collection = db.collection("players");
    const result = await collection.find({}).toArray()
    return res.json(result);
});

// route handler that will return the highest score
app.get("/players/highest-score", async (req, res) => {
    const collection = db.collection("players");
    try {
      // Find all players
      const players = await collection.find({}).toArray();

      // Find the highest score among players
      const highestScore = players.reduce((maxScore, player) => {
        return Math.max(maxScore, player.score);
      }, 0); // Initialize maxScore with 0

      // Send the highest score in the response
      return res.json({ highestScore });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
});

// for adding new players onto the database
app.post("/players", async (req, res) => {
    const collection = db.collection("players");

    // Taking all the information we passed from the post body in
    const playerBodyData = req.body;

    // Creating a new player document
    const newPlayer = {
      name: playerBodyData.name, score: playerBodyData.score, createdAt: new Date()
    };

    try {
      // Inserting player into MongoDB database
      await collection.insertOne(newPlayer);
      // Return the inserted player with an assigned ID
      return res.json(newPlayer)
    } catch (e) {
      console.error("Error creating player:", e);
      return res.status(500).send();
    }
  });

// TODO: Implement a route handler that gets a player's info associated with a given playerID.
app.get("/players/:playerID", async (req, res) => {
    // res.send("TODO: GET /posts/{postID}");
    const playerID = req.params.playerID;
    const collection = db.collection("players");
    try {
        const result = await collection.findOne({"_id": new ObjectId(playerID)});
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no course found with id ${playerID}`);
    }
});

// TODO: Implement a route handler that updates the post associated with a given playerID.
app.patch("/players/:playerID", async (req, res) => {
    // res.send("TODO: PATCH /posts/{postID}");
    const postID = req.params.playerID;
    const data = req.body;
    const collection = db.collection("players");
    try {
        const result = await collection.updateOne({"_id": new ObjectId(postID)}, {$set: data});
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no course found with id ${postID}`);
    }
});

// TODO: Implement a route handler that deletes the post associated with a given playerID.
app.delete("/players/:playerID", async (req, res) => {
    // res.send("TODO: DELETE /posts/{postID}");
    const postID = req.params.playerID;
    const collection = db.collection("posts");
    try {
        const result = await collection.deleteOne({"_id": new ObjectId(postID)});
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no post found with id ${postID}`);
    }
});

// start the Express server
function start() {
    const client = new MongoClient(process.env.ATLAS_URI);
    client.connect()
        .then(() => {
            console.log('Connected successfully to server');
            db = client.db("database");
            app.listen(port, () => {
                console.log(`server started at http://localhost:${port}`);
            });
        })
        .catch(() => {
            console.log("error connecting to mongoDB!");
        });
}

start();