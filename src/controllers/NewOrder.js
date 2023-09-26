import Order from "../models/Order.js";
import User from "../models/User.js";

const NewOrder = async (req, res) => {
  try {
    /* get userId from authorization request setup */
    const userId = req.userId;

    /* Get Data from body */
    const { productdetails, totalprice, shippingaddress, paymentmethod } =
      req.body;

    /* Check required body element exist or not */
    if (!productdetails || !totalprice || !shippingaddress || !paymentmethod) {
      return res.status(404).json({
        success: false,
        statusmessage: "Not Found",
        message: "Required body element does not exist !!",
      });
    }

    /* create new order */
    const order = new Order({
      user: userId,
      products: productdetails,
      shippingaddress: shippingaddress,
      totalprice: totalprice,
      paymentmethod: paymentmethod,
    });
    await order.save();

    /* Save Order detail  in user's order */
    const userOrderInfo = await User.findOneAndUpdate(
      { _id: userId }, // Find the document and specific array element by ID
      {
        $push: {
          orders: order,
        },
      },
      { new: true }
    ).populate("orders");

    await userOrderInfo.save();

    /* reverse the orders , because new order should be at the top */
    userOrderInfo.orders.reverse();

    /* Success Response */
    return res.status(201).json({
      success: true,
      statusmessage: "Created",
      message: "New Order Successfully Done !!",
      data: {
        order: order,
        userOrderInfo: userOrderInfo.orders,
      },
    });
  } catch (error) {
    /* Error Response */
    console.log(error);
    return res.status(500).json({
      success: false,
      statusmessage: "Internal Server Error",
      message: "Error while ordering",
      error,
    });
  }
};

export default NewOrder;
