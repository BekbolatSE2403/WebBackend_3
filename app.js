const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes');

const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/api/blogs', blogRoutes);



//middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Something is wrong"});
} );

//connecting to mongoDB
mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log("MongoDB is connected"))
    .catch(err => {
        console.error("NO CONNECTION", err.message);
        process.exit(1);
    });

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running!!!")
})