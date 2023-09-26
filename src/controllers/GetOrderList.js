import User from "../models/User.js";

const GetOrderList = async (req, res) =>{
    try {
        /* get userId from authorization request setup */
        const userId = req.userId;
    
    
        /* getting orderList */
        const user = await User.findById(userId).populate("orders")

        /* Reverse the list */
        user.orders.reverse()

        /* Success Response */
        return res.status(201).json({
          success: true,
          statusmessage: "Created",
          message: "OrderList Fetched Successfully !!",
          orderlist: user.orders
        });
      } catch (error) {
        /* Error Response */
        console.log(error);
        return res.status(500).json({
          success: false,
          statusmessage: "Internal Server Error",
          message: "Error while fetching orderlist",
          error,
        });
      }
}

export default GetOrderList