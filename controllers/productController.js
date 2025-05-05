const { sendProduct } = require("../services/telegramService");

exports.publishProductFromRequest = async (req, res) => {
  const product = req.body;
  console.log("product", product);
  // בדיקה בסיסית לתקינות הקלט
  const requiredFields = [
    "productTitle",
    "salePrice",
    "originalPrice",
    "discount",
    "image",
    "productLink",
  ];
  const missing = requiredFields.filter((field) => !product[field]);

  if (missing.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing fields: ${missing.join(", ")}` });
  }

  try {
    await sendProduct(product);
    return res
      .status(200)
      .json({ success: true, message: "Product published" });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Failed to publish product" });
  }
};
