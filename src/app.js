if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const moviesRouter = require("./router/movies.router");
const reviewRouter = require("./router/reviews.router");
const theatersRouter = require("./router/theaters.router");
const notFound = require("./utils/notFound");

const app = express();

//get content on the body
app.use(express.json());
//cors requests
app.use(cors());

app.use('/movies', moviesRouter);
app.use('/reviews', reviewRouter);
app.use('/theaters', theatersRouter);

//middlewares 
app.use(notFound);

module.exports = app;
