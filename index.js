const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const { query } = require("express");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ebaxxgs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
   

    const Collection = client.db("Marua").collection("items");

    app.get("/item", async (req, res) => {
      const query = {};
      const cursor = Collection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });

    app.get("/item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const data = await Collection.findOne(query);
      res.send(data);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    
  }
}
run().catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("server is running success");
});

app.listen(port, () => {
  console.log(`port is running on${port}`);
});
