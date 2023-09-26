import User from "../models/User.js";

const GetDefaultAddress = async (req, res) => {
  try {
    /* get userIdfrom authorization request setup */
    const userId = req.userId;

    /* finding the user */
    const defaultAddress = await User.findOne({ _id: userId }).populate("defaultaddress");

    /* check user exist or not */
    if (!defaultAddress) {
      return res.status(404).json({
        succes: false,
        statusmessage: "Bad Request",
        message: "Default Address does not exist",
      });
    }

    /* Success Response */
    return res.status(200).json({
      success: true,
      statusmessage: "OK",
      message: "Get Default address is successfull !!",
      data: {
        defaultaddress: defaultAddress.defaultaddress,
      },
    });
  } catch (error) {

    /* Error Response */
    console.log(error);
    return res.status(500).json({
      success: false,
      statusmessage:"Internal Server Error",
      message: "Error getting default address",
      error,
    });
  }
};

export default GetDefaultAddress;
