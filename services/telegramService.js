const axios = require("axios");
const templates = require("../templates");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = -1002156879723;

function getNextTemplate(product) {
  const index = Math.floor(Math.random() * templates.length);
  return templates[index];
}

async function sendProduct(product) {
  const message = getNextTemplate(product);

  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
    chat_id: CHANNEL_ID,
    photo: product.image,
    caption: message,
    parse_mode: "Markdown",
  });

  console.log(`✅ Published: ${product.productTitle}`);
}

module.exports = { sendProduct };
