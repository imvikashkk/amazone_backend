import User from "../models/User.js";
import Address from "../models/Address.js";

const DeleteAddresss = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId} = req.body;

    /* Check required body elements exist or not */
    if (!addressId) {
      return res.status(404).json({
        success: false,
        statusmessage: "Not Found",
        message: "Required body element does not exist !!",
      });
    }

    /* Update users address's ObjectIds */
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { addresses: addressId } },
      { new: true }
    );

    /* Delete that address from collection */
    await Address.findOneAndDelete({ _id: addressId });

    /* if default address same then remove that default address from user */
    if (addressId === user.defaultaddress) {
      user.defaultaddress = undefined;
    }

    /* Save the user */
    await user.save();

    /* Now Address will be */
    const usersaddress = await User.findOne({ _id: userId }).populate("addresses").populate("defaultaddress");

    /* Finally response Succces */
    return res.status(200).json({
      success: true,
      statusmessage: "OK",
      message: "Deleting address successfully !!",
      data: {
        addresses: usersaddress.addresses,
        defaultaddress: usersaddress.defaultaddress,
      },
    });
  } catch (error) {
    /* Response Erroe */
    console.log(error);
    return res.status(500).json({
      success: false,
      statusmessage: "Internal Server Error !!",
      message: "Error occured while deleting the address !!",
    });
  }
};

export default DeleteAddresss;
