const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = -1002156879723;

function getNextTemplate(product) {
  const index = Math.floor(Math.random() * templates.length);
  const templates = [
    (product) =>
      `📢 **דיל חם מעלי אקספרס! 🔥**\n\n🛍️ **${product.productTitle}**\n💰 **מחיר:** ${product.salePrice}\n🔻 **הנחה:** ${product.discount}%\n👇לקנייה מעליאקספרס👇\n\n🔗 **קנה עכשיו:** [👉 לחץ כאן](${product.productLink})\n\n#AliExpress #Deals\n\n📢 https://t.me/+syM0COFeS10yNDU8`,

    (product) =>
      `🔥 **מציאה שווה באלי אקספרס!** 🔥\n\n📦 **${product.productTitle}**\n💸 רק ב-${product.salePrice} במקום ${product.originalPrice}!\n🎯 הנחה של ${product.discount}%\n\n📲 [קנה עכשיו](${product.productLink})\n\n📌 עקבו אחרי הערוץ: https://t.me/+syM0COFeS10yNDU8`,

    (product) =>
      `🛒 **פריט מומלץ מאלי אקספרס!**\n\n🧾 ${product.productTitle}\n💵 מחיר: ${product.salePrice} (במקום ${product.originalPrice})\n📉 ${product.discount}% הנחה\n\n💬 לפרטים ולרכישה:\n[לחץ כאן](${product.productLink})\n\n📢 https://t.me/+syM0COFeS10yNDU8`,

    (product) =>
      `🎁 **מצאנו לך דיל!**\n\n🛍️ ${product.productTitle}\n✅ רק ב-${product.salePrice} במקום ${product.originalPrice}\n💥 חיסכון של ${product.discount}%\n\n📎 לרכישה:\n[👉 לרכישה מהירה](${product.productLink})\n\n📢 הצטרף לעוד דילים: https://t.me/+syM0COFeS10yNDU8`,

    (product) =>
      `✨ **חדש באלי אקספרס!** ✨\n\n📌 שם המוצר: ${product.productTitle}\n💸 מחיר נוכחי: ${product.salePrice}\n📊 מחיר קודם: ${product.originalPrice}\n📉 אחוז הנחה: ${product.discount}%\n\n🔗 [קנה עכשיו](${product.productLink})\n\n📢 https://t.me/+syM0COFeS10yNDU8`,

    (product) =>
      `📦 **המלצת השבוע מעלי אקספרס!**\n\n📌 ${product.productTitle}\n💰 מחיר מבצע: ${product.salePrice}\n⛔ במקום: ${product.originalPrice}\n🔥 ${product.discount}% הנחה\n\n✅ [קנייה מיידית](${product.productLink})\n\n📢 הצטרף לדילים חמים: https://t.me/+syM0COFeS10yNDU8`,

    (product) =>
      `🚀 **מוצר ששווה לבדוק!**\n\n🛍️ ${product.productTitle}\n💰 ${product.salePrice} בלבד\n📉 חיסכון של ${product.discount}%\n\n🔗 [קנה עכשיו](${product.productLink})\n\n📢 https://t.me/+syM0COFeS10yNDU8`,

    (product) =>
      `🌟 **מצאנו לך דיל מנצח!**\n\n📦 מוצר: ${product.productTitle}\n💲 מחיר: ${product.salePrice}\n📉 הנחה: ${product.discount}%\n\n🔗 [הזמן עכשיו](${product.productLink})\n\n📢 עקבו אחרי הערוץ לדילים יומיים: https://t.me/+syM0COFeS10yNDU8`,

    (product) =>
      `🔥 **סייל לוהט מעלי אקספרס!** 🔥\n\n🛍️ ${product.productTitle}\n💰 ${product.salePrice} במקום ${product.originalPrice}\n💯 חיסכון: ${product.discount}%\n\n📲 [לרכישה מהירה](${product.productLink})\n\n📢 הצטרפו לעוד מבצעים: https://t.me/+syM0COFeS10yNDU8`,

    (product) =>
      `📢 **מציאה מיוחדת מאלי אקספרס!**\n\n📦 ${product.productTitle}\n💵 מחיר מבצע: ${product.salePrice}\n📉 ${product.discount}% הנחה!\n\n🔗 [קנייה מיידית](${product.productLink})\n\n📢 אל תפספסו דילים נוספים: https://t.me/+syM0COFeS10yNDU8`,
  ];

  return templates[index](product); // יישום התבנית הנבחרת
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
