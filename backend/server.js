const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json());

// Connection URI and DB/Collection setup
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let todoCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db('TodoList');
    todoCollection = db.collection('todos');
    console.log('Connected to MongoDB (native driver)');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectDB();

// GET all todos
app.get('/data', async (req, res) => {
  try {
    const data = await todoCollection.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new todo
app.post('/data', async (req, res) => {
  try {
    const { task } = req.body;
    const result = await todoCollection.insertOne({ task });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server start
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
