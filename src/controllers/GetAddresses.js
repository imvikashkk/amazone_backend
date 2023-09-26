import User from "../models/User.js";

const GetAddresses = async (req, res) => {
  try {
    /* get userId from authorization request setup */
    const userId = req.userId;

    /* finding the user's address */
    const user = await User.findOne({ _id: userId }).populate("addresses").populate("defaultaddress");

    /* Response Successfull */
    return res.status(200).json({
      success: true,
      statusmessage: "OK",
      message: "Addresses Found Successfully !!",
      data: {
        addresses: user.addresses,
        defaultaddress: user.defaultaddress,
      },
    });

  } catch (error) {
    /* Error Response */
    return res.status(500).json({
        success: false,
        statusmessage:"Internal Server Error",
        message: "Error creating address",
        error,
      });
  }
};

export default GetAddresses;
