const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

async function connectToMongoDBAtlas() {
  try {
    const uri = 'mongodb://127.0.0.1:27017';
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options if needed
    });

    // Connected successfully
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    // Handle connection errors
    console.error('Error connecting to MongoDB Atlas:', err);
  }
}

connectToMongoDBAtlas();

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
});

const Book = mongoose.model('Book', bookSchema);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});

app.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    res.json(deletedBook);
  } catch (error) {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
