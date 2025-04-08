const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://neeshu:<db_password>@neeshu.cwxzomm.mongodb.net/?retryWrites=true&w=majority&appName=neeshu', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));

// Schema
const ScoreSchema = new mongoose.Schema({
  username: String,
  score: Number,
  timestamp: { type: Date, default: Date.now }
});
const Score = mongoose.model('Score', ScoreSchema);

// Save score endpoint
// Save score endpoint
app.post('/save-score', async (req, res) => {
  const { username, score } = req.body;
  try {
    const newScore = new Score({ username, score });
    await newScore.save();
    res.status(200).send('Score saved!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving score');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
