import * as dotenv from "dotenv"
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config({ path: "./.env"});
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class MongoDB {
  private client!: MongoClient; 
  private uri: string = process.env.MONGO_URI as string

  cosntructor() {
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  public async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  }

  public getClient() {
    return this.client;
  }

}; 

export const mongoDB = new MongoDB