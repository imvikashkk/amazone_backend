import User from "../models/User.js";
import Address from "../models/Address.js";

const UpdateAddress = async (req, res) => {
  try {
    /* get userIdfrom authorization request setup */
    const userId = req.userId;

    /* get address from body */
    const { address } = req.body;

    /* check address exist or not */
    if (!address) {
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

    /* Update the address */
    await Address.findOneAndUpdate(
      { _id: address._id },
      { ...address },
      { new: true }
    );

    /* if defaultaddress */
    if (address.defaultaddress) {
      user.defaultaddress = address._id;
    }
    else if(address.defaultaddress==false){
      user.defaultaddress = undefined;
    }

    /* sav e user detail */
    await user.save();

    /* Now Addresses will be */
    const usersaddress = await User.findOne({ _id: userId }).populate("addresses").populate("defaultaddress");

    /* Success Response */
    return res.status(200).json({
      success: true,
      statusmessage: "OK",
      message: "Address updated succesfully !!",
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
      statusmessage: "Internal Server Error",
      message: "Error creating address",
      error,
    });
  }
};

export default UpdateAddress;
