import multer from 'multer';
import fs from 'fs';
import path from 'path';
import productModel from '../server/src/models/productModel'; // Adjust paths as needed

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './client/creme-brulee/public/upload/');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

// Helper function to handle file removal
function removeFile(fileName) {
  const directoryPath = path.join(__dirname, './client/creme-brulee/public/upload/');
  fs.unlink(path.join(directoryPath, fileName), (err) => {
    if (err) {
      console.error("File removal failed:", err);
    } else {
      console.log("File deleted successfully:", fileName);
    }
  });
}

// Serverless function to handle product details POST request
export const productDetails = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const productDetails = {
        category: req.body.category,
        itemName: req.body.itemName,
        description: req.body.description,
        ingredients: req.body.ingredients,
        product_available: req.body.product_available,
        price: req.body.price,
        image: req.body.image,
      };
      const savedProduct = await productModel(productDetails).save();
      if (savedProduct) {
        return res.status(200).json({
          success: true,
          error: false,
          details: savedProduct,
          message: 'Product details saved',
        });
      }
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Product details missing',
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        success: false,
        error: true,
        message: 'Something went wrong',
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      error: true,
      message: 'Method Not Allowed',
    });
  }
};

// Serverless function to view product details
export const viewProduct = async (req, res) => {
  const { _id } = req.query; // get product ID from query params
  try {
    const product = await productModel.findById(_id);
    if (product) {
      return res.status(200).json({
        success: true,
        error: false,
        details: product,
        message: 'Product found',
      });
    }
    return res.status(404).json({
      success: false,
      error: true,
      message: "Product not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Serverless function to delete a product
export const deleteProduct = async (req, res) => {
  const { itemName } = req.body;
  try {
    const deletedProduct = await productModel.deleteOne({ itemName });
    if (deletedProduct.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        error: false,
        message: 'Item deleted',
      });
    }
    return res.status(404).json({
      success: false,
      error: true,
      message: 'Item not found',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Serverless function to update product details
export const updateProduct = async (req, res) => {
  const { olditemName, category, itemName, description, ingredients, price, product_available, image } = req.body;
  try {
    const updatedItem = await productModel.updateMany(
      { itemName: olditemName },
      { $set: { category, itemName, description, ingredients, price, product_available, image } }
    );
    if (updatedItem.modifiedCount === 1) {
      return res.status(200).json({
        success: true,
        error: false,
        details: updatedItem,
        message: 'Data updated',
      });
    }
    return res.status(400).json({
      success: false,
      error: true,
      message: 'Data not updated',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Serverless function to retrieve product image by name
export const productImage = async (req, res) => {
  const { name } = req.query;  // Get product name from query
  try {
    const product = await productModel.find({ name });
    if (product.length > 0) {
      return res.status(200).json({
        success: true,
        error: false,
        details: product[0],
        message: 'Product image found',
      });
    }
    return res.status(404).json({
      success: false,
      error: true,
      message: 'Unable to find product image',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Serverless function for price filtering
export const priceFilter = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const products = await productModel.find();
    const filteredProducts = products.filter(
      (product) => product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice)
    );
    if (filteredProducts.length > 0) {
      return res.status(200).json({
        success: true,
        error: false,
        details: filteredProducts,
        message: 'Filtered by price',
      });
    }
    return res.status(404).json({
      success: false,
      error: true,
      message: 'No products found in this price range',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Serverless function for category filtering
export const categoryFilter = async (req, res) => {
  const { category, itemName } = req.query;
  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (itemName) {
    filter.itemName = { $regex: itemName, $options: 'i' };
  }
  try {
    const products = await productModel.find(filter);
    if (products.length > 0) {
      return res.status(200).json({
        success: true,
        error: false,
        details: products,
        message: 'Products filtered',
      });
    }
    return res.status(404).json({
      success: false,
      error: true,
      message: 'No products found matching the criteria',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Something went wrong',
    });
  }
};
