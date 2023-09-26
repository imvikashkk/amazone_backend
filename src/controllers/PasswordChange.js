import User from "../models/User.js";

const PasswordChange = async (req, res) => {
  try {

    /* Access Body element from parsed body */
    const { email, newpassword, otp } = req.body;

    /* check required body exist or not */
    if (!email || !newpassword || !otp) {
      return res.status(400).json({
        success: false,
        statusmessage: "Bad Request",
        message: "Required body elements are missing !!",
      });
    }

    /* Check the user exists or not */
    const user = await User.findOne({ email }); // Access details from Database
    if (!user) {
      return res.status(404).json({
        success: false,
        statusmessage: "Not Found",
        message: "Email Address is not registered !!",
      });
    }


    /* Check in database OTP exits or not */
    if (!user.otp) {
      return res.status(410).json({
        success: false,
        statusmessage:"Gone",
        message: "OTP is expired",
      });
    }


    /* Check OTP match or not */
    if (user.otp !== otp) {
      return res.status(409).json({
        success: false,
        statusmessage:"Conflict",
        message: "Invalid OTP",
      });
    }

    /* Rewrite password, otp, and email verified */
    user.password = newpassword;
    user.otp = undefined; // OTP must be cleared after changing the password
    user.verified = true; // set user verified if  not verified, because there is no need to verify agai using verification Link

    await user.save(); // Save in database

    /* Response success */
    return res.status(200).json({
      success: true,
      statusmessage:"OK",
      message: "Password has been updated successfully",
    });
  } catch (error) {
    /* Response Error */
    console.log(error)
    return res.status(500).json({
      success: false,
      statusmessage:"Internal Server Error !!",
      error: error
    });
  }
};

export default PasswordChange;


/* NOTE */
// Password will be encrypted in modal before sav in database
