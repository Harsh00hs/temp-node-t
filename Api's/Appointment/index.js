const express = require("express");
const mongoose = require("mongoose");

const appointmentRoutes = require("./routes/appointmentRoutes")

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Connect to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/Node_api")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Connection Error:", err.message);
        process.exit(1); // Exit process on failure
    });

//routes
app.use('/', appointmentRoutes)

app.listen(5000, () => {
    console.log("server is running on port 5000");
});