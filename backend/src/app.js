const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const taskRouter = require('./routes/task.route');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/tasks', taskRouter);

const port = process.env.PORT || 4000;

const mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err.message);
    });

module.exports = app;