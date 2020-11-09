const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running at port: ${PORT}`));

// Set up mongoose
mongoose.connect(
	process.env.MONGODB_CONNECTION_STRING,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	(err) => {
		if (err) throw err;
		console.log('MongoDB connection estabilished.');
	}
);

// Routes
app.use('/users', require('./routes/userRouter'));
