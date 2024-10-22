import express from "express";
import router from "./routes/url.js"; // Ensure this path is correct
import connectDB from "./config/db.js"; // Ensure this path is correct

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Use the URL router for handling /api/url requests
app.use("/api/url", router);

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error(`Error starting the server: ${error.message}`);
    process.exit(1); 
  });
