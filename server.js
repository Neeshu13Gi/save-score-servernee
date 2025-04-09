// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://neeshu:YC7pQ0Unf32NKHi7@neeshu.cwxzomm.mongodb.net/scoreDB?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('Mongo error:', err));

// // Schema
// const ScoreSchema = new mongoose.Schema({
//   score: Number,
//   timestamp: { type: Date, default: Date.now }
// });
// const Score = mongoose.model('Score', ScoreSchema);

// // Save score endpoint
// // Save score endpoint
// app.post('/save-score', async (req, res) => {
//   const { score } = req.body;
//   try {
//     const newScore = new Score({ score });
//     await newScore.save();
//     res.status(200).send('Score saved!');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error saving score');
//   }
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));










const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://neeshu:YC7pQ0Unf32NKHi7@neeshu.cwxzomm.mongodb.net/scoreDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ Mongo error:', err));

// Schema and model
const ScoreSchema = new mongoose.Schema({
  name: String,                    // New: user's name
  score: Number,                  // User's score
  timestamp: { type: Date, default: Date.now } // Auto time
});

const Score = mongoose.model('Score', ScoreSchema);

// POST endpoint to save name and score
app.post('/save-score', async (req, res) => {
  const { name, score } = req.body;

  // Optional: Basic validation
  if (!name || typeof score !== 'number') {
    return res.status(400).send('Invalid name or score');
  }

  try {
    const newScore = new Score({ name, score });
    await newScore.save();
    res.status(200).send('✅ Score and name saved successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error saving data');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
