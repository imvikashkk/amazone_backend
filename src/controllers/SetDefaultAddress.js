import User from "../models/User.js";

const SetDefaultAddress = async (req, res) => {
  try {
    /* get userIdfrom authorization request setup */
    const userId = req.userId;

    /* get address from body */
    const { defaultAddressId } = req.body;

    /* check address exist or not */
    if (!defaultAddressId) {
      return res.status(404).json({
        success: false,
        statusmessage: "Not Found",
        message: "Required body element does not exist !!",
      });
    }

    /* finding the user */
    const user = await User.findOne({ _id: userId });

    /* check user exist or not */
    if (!user) {
      return res.status(404).json({
        succes: false,
        statusmessage: "Bad Request",
        message: "User Doest not Exist",
      });
    }

    /* set default address */
    user.defaultaddress = defaultAddressId

    /* Save User Detals */
    await user.save();

    /* Now Address will be */
    const usersaddress = await User.findOne({ _id: userId }).populate("addresses").populate("defaultaddress");

    /* Success Response */
    return res.status(200).json({
      success: true,
      statusmessage: "OK",
      message: "Address set as default address is successfully done !!",
      data: {
        addresses: usersaddress.addresses,
        defaultaddress: usersaddress.defaultaddress,
      },
    });
  } catch (error) {

    /* Error Response */
    console.log(error);
    return res.status(500).json({
      success: false,
      statusmessage:"Internal Server Error",
      message: "Error setting default address",
      error,
    });
  }
};

export default SetDefaultAddress;
