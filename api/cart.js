import { MongoClient } from 'mongodb';  // MongoDB client if you're using MongoDB Atlas
import { checkAuth } from '../server/middleware/checkAuth'; // If you're still using middleware

// MongoDB connection setup
const connectDb = async () => {
  if (global.mongo) {
    return global.mongo;
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  global.mongo = client;
  return client;
};

// Main API handler function
export default async function handler(req, res) {
  const client = await connectDb();
  const db = client.db('creme-brulee');  // Replace with your database name
  const cartModel = db.collection('cart');
  const productModel = db.collection('product_tbs');
  const checkoutModel = db.collection('checkout_tbs');

  // Switch based on the HTTP method
  switch (req.method) {
    case 'POST':
      if (req.body.action === 'add-to-cart') {
        return await addToCart(req, res, cartModel);
      } else if (req.body.action === 'checkout') {
        return await checkout(req, res, cartModel, checkoutModel);
      }
      break;

    case 'GET':
      if (req.query.action === 'view-cart') {
        return await viewCart(req, res, cartModel, productModel);
      }
      break;

    case 'DELETE':
      if (req.query.action === 'delete') {
        return await deleteItem(req, res, cartModel);
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}

// Example of a POST handler to add an item to the cart
const addToCart = async (req, res, cartModel) => {
  const { loginID, productID } = req.body;
  try {
    const existingItem = await cartModel.findOne({ productID, loginID });

    if (!existingItem) {
      const dateString = new Date();
      const date = new Date(dateString);
      const formattedDate = date.toISOString().split('T')[0];

      const newCartItem = {
        loginID,
        productID,
        quantity: 1,
        status: 0,
        date: formattedDate,
      };

      await cartModel.insertOne(newCartItem);
      return res.status(200).json({ success: true, message: 'Item added to cart.' });
    } else {
      return res.status(400).json({ success: false, message: 'Item already exists in cart.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to add item to cart.' });
  }
};

// Example of a GET handler to view the cart
const viewCart = async (req, res, cartModel, productModel) => {
  const { loginID } = req.query; // Get loginID from query params or request body

  try {
    const cartItems = await cartModel.aggregate([
      {
        $lookup: {
          from: 'product_tbs',
          localField: 'productID',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      { $unwind: '$productDetails' },
      { $match: { loginID, status: 0 } },
      {
        $group: {
          _id: '$_id',
          quantity: { $first: '$quantity' },
          productDetails: { $first: '$productDetails' },
        },
      },
    ]);

    cartItems.forEach((item) => {
      item.subtotal = item.productDetails.price * item.quantity;
    });

    return res.status(200).json({ success: true, items: cartItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving cart.' });
  }
};

// Example of a POST handler for checkout
const checkout = async (req, res, cartModel, checkoutModel) => {
  const { loginID, checkoutData } = req.body; // checkoutData will have all the fields like name, address, etc.
  
  try {
    const updatedStatus = await cartModel.updateMany({ loginID }, { $set: { status: 1 } });

    if (updatedStatus.modifiedCount > 0) {
      const checkout = new checkoutModel(checkoutData);
      await checkout.save();
      return res.status(200).json({ success: true, message: 'Order placed successfully.' });
    } else {
      return res.status(400).json({ success: false, message: 'Failed to update cart status.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error during checkout.' });
  }
};

// Example of a DELETE handler to delete an item from the cart
const deleteItem = async (req, res, cartModel) => {
  const { itemId } = req.query; // Item ID to delete
  
  try {
    const result = await cartModel.deleteOne({ _id: itemId });
    if (result.deletedCount === 1) {
      return res.status(200).json({ success: true, message: 'Item deleted from cart.' });
    } else {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting item from cart.' });
  }
};








