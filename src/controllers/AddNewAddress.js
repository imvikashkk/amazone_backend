import User from "../models/User.js";
import Address from "../models/Address.js";

const AddNewAddress = async (req, res) => {
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

    /* Add address to database */
    const setAddress = new Address(address);

    
    /* push objectId of added address to user address */
    user.addresses.push(setAddress._id);


    /* if defaultaddress true */
    if(address.defaultaddress){
        user.defaultaddress = setAddress._id
    }

    /* save to database */
    await setAddress.save()
    await user.save();


    /* Now Address will be */
    const usersaddress = await User.findOne({ _id: userId }).populate("addresses").populate("defaultaddress");

    /* Success Response */
    return res.status(201).json({
      success: true,
      statusmessage: "Created",
      message: "Address Created Successfully",
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
      message: "Error creating address",
      error,
    });
  }
};

export default AddNewAddress;
