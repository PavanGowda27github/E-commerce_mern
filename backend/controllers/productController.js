import Product from "../models/product.js";

//create new product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error,
    });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // case-insensitive search
    }
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//update a product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: "product updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

//delete a product

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
