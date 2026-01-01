const express = require("express");
const cors = require("cors");

const urlRoutes = require("./routes/url.routes");
const travelRoutes = require("./routes/travel.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();
// Configure CORS to allow requests from frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Travel Guide API",
    endpoints: {
      travel: {
        places: "GET /api/travel/places",
        accommodations: "GET /api/travel/accommodations",
        restaurants: "GET /api/travel/restaurants",
        weather: "GET /api/travel/weather/:location",
        culture: "GET /api/travel/culture",
        packing: "GET /api/travel/packing",
        chatbot: "POST /api/travel/chatbot"
      }
    }
  });
});

app.use("/api/travel", travelRoutes);
app.use("/api", urlRoutes); // Keep URL shortener routes for backward compatibility
app.use(errorHandler);

module.exports = app;
