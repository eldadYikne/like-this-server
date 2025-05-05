require("dotenv").config();
const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const ALIEXPRESS_APP_KEY = process.env.ALIEXPRESS_APP_KEY;
const ALIEXPRESS_TRACKING_ID = process.env.ALIEXPRESS_TRACKING_ID;

const express = require("express");
const bodyParser = require("body-parser");
const telegramRoutes = require("./routes/telegramRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Register routes
app.use("/api", telegramRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// התחלת הפרסום
// startPosting();
