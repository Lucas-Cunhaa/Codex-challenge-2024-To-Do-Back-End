import express from "express";
import cors from "cors";
import route from "./routes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(route);

const port = process.env.PORT || 3030;

app.listen( port, () => {
    console.log("Server running on port", port);
});
