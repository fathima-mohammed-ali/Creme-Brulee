import { MongoClient, ObjectId } from 'mongodb';

const connectDb = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
};

export default async function handler(req, res) {
  let client;
  try {
    client = await connectDb();
    const db = client.db('creme-brulee');
    const cartModel = db.collection('cart');
    const productModel = db.collection('product_tbs');
    const checkoutModel = db.collection('checkout_tbs');

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
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client) {
      client.close(); // Ensure the MongoDB connection is closed
    }
  }
}

// Handlers remain mostly unchanged

const addToCart = async (req, res, cartModel) => {
  const { loginID, productID } = req.body;
  try {
    const existingItem = await cartModel.findOne({ productID, loginID });

    if (!existingItem) {
      const date = new Date().toISOString().split('T')[0];
      const newCartItem = {
        loginID,
        productID,
        quantity: 1,
        status: 0,
        date,
      };

      await cartModel.insertOne(newCartItem);
      return res.status(200).json({ success: true, message: 'Item added to cart.' });
    } else {
      return res.status(400).json({ success: false, message: 'Item already exists in cart.' });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ success: false, message: 'Failed to add item to cart.' });
  }
};

const viewCart = async (req, res, cartModel, productModel) => {
  const { loginID } = req.query;

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
    ]).toArray();

    cartItems.forEach((item) => {
      item.subtotal = item.productDetails.price * item.quantity;
    });

    return res.status(200).json({ success: true, items: cartItems });
  } catch (error) {
    console.error('Error viewing cart:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving cart.' });
  }
};

const checkout = async (req, res, cartModel, checkoutModel) => {
  const { loginID, checkoutData } = req.body;

  try {
    const updatedStatus = await cartModel.updateMany({ loginID }, { $set: { status: 1 } });

    if (updatedStatus.modifiedCount > 0) {
      await checkoutModel.insertOne(checkoutData);
      return res.status(200).json({ success: true, message: 'Order placed successfully.' });
    } else {
      return res.status(400).json({ success: false, message: 'Failed to update cart status.' });
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    return res.status(500).json({ success: false, message: 'Error during checkout.' });
  }
};

const deleteItem = async (req, res, cartModel) => {
  const { itemId } = req.query;

  try {
    const result = await cartModel.deleteOne({ _id: new ObjectId(itemId) });
    if (result.deletedCount === 1) {
      return res.status(200).json({ success: true, message: 'Item deleted from cart.' });
    } else {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ success: false, message: 'Error deleting item from cart.' });
  }
};








