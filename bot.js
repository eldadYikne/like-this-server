require("dotenv").config();
const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const ALIEXPRESS_APP_KEY = process.env.ALIEXPRESS_APP_KEY;
const ALIEXPRESS_TRACKING_ID = process.env.ALIEXPRESS_TRACKING_ID;

async function fetchAliExpressProducts() {
  try {
    const response = await axios.get(
      "https://api.aliexpress.com/openapi/param2/2.0.0/t/aop.api.listPromotionProducts",
      {
        params: {
          appKey: ALIEXPRESS_APP_KEY,
          trackingId: ALIEXPRESS_TRACKING_ID,
          fields: "productId,productTitle,discount,salePrice,imageUrl",
          discountStart: "30", // רק מוצרים עם לפחות 30% הנחה
          sort: "orders_desc", // מיון לפי הכי נמכרים
          pageSize: 5, // כמה מוצרים למשוך
        },
      }
    );

    return response.data.products || [];
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    return [];
  }
}

async function sendProduct(product) {
  const message = `
📢 **דיל חם מעלי אקספרס! 🔥**  

🛍️ **${product.productTitle}**  
💰 **מחיר:** ${product.salePrice}  
🔻 **הנחה:** ${product.discount}%  

🔗 **קנה עכשיו:** [👉 לחץ כאן](https://www.aliexpress.com/item/${product.productId}.html)  

#AliExpress #Deals #Shopping  
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      chat_id: CHANNEL_ID,
      photo: product.imageUrl,
      caption: message,
      parse_mode: "Markdown",
    });

    console.log(`📤 נשלח: ${product.productTitle}`);
  } catch (error) {
    console.error(
      "❌ Error sending product:",
      error.response?.data || error.message
    );
  }
}

// פונקציה שמריצה את התהליך כל שעה
async function startPosting() {
  const products = await fetchAliExpressProducts();

  if (products.length === 0) {
    console.log("❌ אין מוצרים מתאימים.");
    // return;
  }

  let index = 0;

  async function postNextProduct() {
    if (index >= products.length) index = 0;
    // await sendProduct(products[index]);
    index++;
  }

  postNextProduct(); // שליחת המוצר הראשון מיידית
  setInterval(postNextProduct, 3600000); // שליחת מוצר חדש כל שעה
}

// התחלת הפרסום
startPosting();
