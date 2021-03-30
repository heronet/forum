require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users/', userRoutes);
app.use('/api/posts/', postRoutes);

const PORT = process.env.PORT || 5000;
// Connect to the Database and THEN start the server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`Connected to database`);
    app.listen(PORT, () => {
        console.log(`Listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
    });
}).catch(err => console.log(err));
