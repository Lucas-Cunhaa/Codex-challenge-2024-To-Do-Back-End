import * as dotenv from "dotenv"
import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";
dotenv.config({ path: "./.env"});
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class MongoDB {

  private client!: MongoClient; 
  private db!: Db; 
  private collection!: Collection;
  private uri: string = process.env.MONGO_URI as string;
  private isConnected = false ;

  cosntructor() {
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    this.db = this.client.db("codex-todo")
    this.collection = this.db.collection("users")
  }

  public async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      if(!this.isConnected) {
        await this.client.connect();
        // Send a ping to confirm a successful connection
        await this.client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return this.client
      }
    } catch (err) {
      console.error("Error on connection", err)
      // Ensures that the client will close when you finish/error
    
    }
  }
  public async disconnect() {
    if (this.isConnected) {
      await this.client.close();
      this.isConnected = false;
      console.log("MongoDB connection closed");
    }
  }

  public getClient() {
    return this.client;
  }

  public getDb() {
    return this.db;
  }

  public getCollection() {
    return this.collection;
  }


}; 

export const mongoDB = new MongoDB