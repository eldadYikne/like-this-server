require("dotenv").config(); // Load environment variables
const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = -1002156879723;

const products = [
  {
    productTitle:
      "מתג לדוד מים Tuya Smart Life אפליקציית שלט רחוק אנרגיה קול ניטור Google Home Alexa ",
    salePrice: "47.19 ₪",
    originalPrice: "50.91 ₪",
    discount: "7",
    image:
      "https://ae-pic-a1.aliexpress-media.com/kf/Sd614c136984e4bcfad4ae720a442f262i.jpg", // תצטרך להחליף את כתובת התמונה המדויקת אם היא שונה.
    productLink: "https://s.click.aliexpress.com/e/_oFUPRoK",
  },
  {
    productTitle: "טוחן אשפה MIUI עם הפחתת רעש",
    salePrice: "356.20 ₪",
    originalPrice: "1872.99 ₪",
    discount: "81",
    image:
      "https://ae-pic-a1.aliexpress-media.com/kf/S5900aec2059c4034b666b6a9facbcc02Y.jpg",
    productLink: "https://s.click.aliexpress.com/e/_oD6XwSI",
  },
  {
    productTitle: "מטען נייד Baseus 65W עם כבל Type-C נשלף",
    salePrice: "230.52 ₪",
    originalPrice: "405.26 ₪",
    discount: "43",
    image:
      "https://ae-pic-a1.aliexpress-media.com/kf/S1ff924953a5a4463b460f43102fcb312N.jpg",
    productLink: "https://s.click.aliexpress.com/e/_opOGAII",
  },
  {
    productTitle: "קומקום חכם לחימום חלב לתינוק 1.2L",
    salePrice: "133.35 ₪",
    originalPrice: "360.40 ₪",
    discount: "63",
    image:
      "https://ae-pic-a1.aliexpress-media.com/kf/S8ba50b1c54294ec9942386281faa08ecp.jpg",
    productLink: "https://s.click.aliexpress.com/e/_opOGAII",
  },
  {
    productTitle: "מובייל מעץ לעריסה עם צעצועי קטיפה",
    salePrice: "33.63 ₪",
    originalPrice: "36.17 ₪",
    discount: "7",
    image:
      "https://ae-pic-a1.aliexpress-media.com/kf/S583818f6a13c4c7bbd2d905431d8e7a5s.jpg",
    productLink: "https://s.click.aliexpress.com/e/_oDfj3BM",
  },
  {
    productTitle: "חולצת טי שירט לגברים עשויה 100% כותנה",
    salePrice: "29.91 ₪",
    originalPrice: "71.22 ₪",
    discount: "58",
    image:
      "https://ae-pic-a1.aliexpress-media.com/kf/Sdf874e8431f948788479541b5a0c3caaG.png",
    productLink: "https://s.click.aliexpress.com/e/_opVx4Fo",
  },
];

let currentIndex = 0;

async function sendProduct() {
  const product = products[currentIndex];
  let lastIndex = -1;

  const message = getNextTemplate(product, lastIndex);

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      chat_id: CHANNEL_ID,
      photo: product.image,
      caption: message,
      parse_mode: "Markdown",
    });

    console.log(`📤 Sent product: ${product.productTitle}`);
  } catch (error) {
    console.error(
      "❌ Error sending product:",
      error.response?.data || error.message
    );
  }

  // Move to the next product
  currentIndex = (currentIndex + 1) % products.length;
}

// Schedule: send a product every hour (3600000 ms)
// setInterval(sendProduct, 3600000);

// Send the first product immediately
// sendProduct();
// setTimeout(() => setInterval(sendProduct, 3600000), 5000); // Start the loop after 5 sec  this is my code add yiuar code Aliexpress api

function getNextTemplate(product, lastIndex) {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * 10); // Choose a number from 0-9
  } while (newIndex === lastIndex); // Ensure a different template is chosen

  lastIndex = newIndex;

  switch (newIndex) {
    case 0:
      return `📢 **דיל חם מעלי אקספרס! 🔥**  

      🛍️ **${product.productTitle}**  
      💰 **מחיר:** ${product.salePrice}  
      🔻 **הנחה:** ${product.discount}%  
      👇לקנייה מעליאקספרס👇  

      🔗 **קנה עכשיו:** [👉 לחץ כאן](${product.productLink})  

      #AliExpress #Deals #Shopping  

      לערוץ הראשי ⬅️ https://t.me/+syM0COFeS10yNDU8`;

    case 1:
      return `🔥 **מבצע מטורף לזמן מוגבל! 🛍️**  

      🎁 **${product.productTitle}**  
      💵 **מחיר מיוחד:** ${product.salePrice}  
      📉 **הנחה ענקית של:** ${product.discount}%  
      ⏳ **מהרו! המלאי מוגבל!**  

      🔗 **קנה עכשיו:** [👉 לחץ כאן](${product.productLink})  

      #AliExpress #Shopping #Bargain  

      📢 **לעוד מבצעים שווים:** https://t.me/+syM0COFeS10yNDU8`;

    case 2:
      return `🚨 **מוצר מבוקש במחיר מטורף! 🔥**  

      🛍️ **${product.productTitle}**  
      💰 **מחיר מיוחד:** ${product.salePrice}  
      📢 **הנחה של:** ${product.discount}%  
      🛒 **אל תפספס!**  

      🔗 **קנה עכשיו:** [👉 לחץ כאן](${product.productLink})  

      #AliExpress #Deals #HotSale  

      📢 **כל הדילים במקום אחד:** https://t.me/+syM0COFeS10yNDU8`;

    case 3:
      return `💎 **מוצר פרימיום במחיר מדהים!**  

      🎉 **${product.productTitle}**  
      💲 **מחיר מבצע:** ${product.salePrice}  
      🚀 **הנחה מטורפת של:** ${product.discount}%  

      🛍️ **לחץ כאן וקנה עכשיו!**  
      🔗 [👉 לקנייה מהירה](${product.productLink})  

      #AliExpress #ExclusiveDeals  

      📢 **הצטרף לערוץ המבצעים שלנו:** https://t.me/+syM0COFeS10yNDU8`;

    case 4:
      return `🔝 **הבחירה של הקונים! 🔥**  

      🏆 **${product.productTitle}**  
      💰 **מחיר:** ${product.salePrice}  
      📉 **הנחה:** ${product.discount}%  

      🛍️ **מהרו! לפני שיגמר המלאי!**  
      🔗 [👉 קנה עכשיו](${product.productLink})  

      #AliExpress #BestSeller  

      💬 **קבל עדכונים חמים:** https://t.me/+syM0COFeS10yNDU8`;

    case 5:
      return `🔥 **מציאה אמיתית! אל תפספס!**  

      🛒 **${product.productTitle}**  
      💵 **מחיר לזמן מוגבל:** ${product.salePrice}  
      ⏳ **הנחה:** ${product.discount}%  

      📦 **משלוח מהיר ובטוח!**  
      🔗 [👉 רכישה מיידית](${product.productLink})  

      #AliExpress #SuperDeals  

      📢 **קבל דילים ישירות לטלגרם:** https://t.me/+syM0COFeS10yNDU8`;

    case 6:
      return `🛍️ **מכירה חמה עכשיו!**  

      🔥 **${product.productTitle}**  
      💲 **מחיר מדהים:** ${product.salePrice}  
      📢 **הנחה גדולה:** ${product.discount}%  

      🎁 **רכישה בטוחה ומשתלמת**  
      🔗 [👉 הזמנה מהירה](${product.productLink})  

      #AliExpress #BestDeals  

      📢 **כל המבצעים במקום אחד:** https://t.me/+syM0COFeS10yNDU8`;

    case 7:
      return `💡 **מבצע מיוחד על מוצר נבחר!**  

      🛒 **${product.productTitle}**  
      💰 **מחיר מיוחד:** ${product.salePrice}  
      🎯 **הנחה:** ${product.discount}%  

      📦 **אספקה מהירה עד הבית!**  
      🔗 [👉 קנה כאן](${product.productLink})  

      #AliExpress #LimitedTimeOffer  

      📢 **קבל עדכונים חמים:** https://t.me/+syM0COFeS10yNDU8`;

    case 8:
      return `🛍️ **מכירה מטורפת! המבצע נגמר בקרוב!**  

      🎉 **${product.productTitle}**  
      💲 **מחיר היום:** ${product.salePrice}  
      🚀 **הנחה של:** ${product.discount}%  

      🛒 **לרכישה לחצו כאן:**  
      🔗 [👉 קנה עכשיו](${product.productLink})  

      #AliExpress #ShoppingTime  

      📢 **הצטרף לערוץ המבצעים:** https://t.me/+syM0COFeS10yNDU8`;

    case 9:
      return `🔥 **המבצע שאסור לפספס!**  

      🛒 **${product.productTitle}**  
      💰 **מחיר חסר תקדים:** ${product.salePrice}  
      📉 **הנחה:** ${product.discount}%  

      🚀 **משלוח מהיר!**  
      🔗 [👉 רכשו עכשיו](${product.productLink})  

      #AliExpress #Shopping  

      📢 **הכי משתלם בטלגרם:** https://t.me/+syM0COFeS10yNDU8`;

    default:
      return `🚀 **מבצע מיוחד - בדוק עכשיו!**  

      🛒 **${product.productTitle}**  
      💰 **מחיר:** ${product.salePrice}  
      📉 **הנחה:** ${product.discount}%  

      🔗 [👉 קנה עכשיו](${product.productLink})  

      #AliExpress #BestDeals  

      📢 **הצטרף לערוץ הדילים:** https://t.me/+syM0COFeS10yNDU8`;
  }
}
