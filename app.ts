import express from "express";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors)

app.listen(3030, () => {
    console.log("Server running on port 3030")
});
