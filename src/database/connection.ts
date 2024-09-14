import * as dotenv from "dotenv"
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config({ path: "./.env"});

// const uri = "mongodb+srv://lucasgalvao:vqAEemxs76WHtdIj@cluster0.1g0jd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = process.env.MONGO_URI as string
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
