import User from "../models/User.js";
import SendVerificationEmail from "../utils/SendVerificationEmail.js";

const ResendVerificationToken = async (req, res) => {
  try {
    /* Access parsed required body element */
    const { email } = req.body;

    /* check required body exist or not */
    if (!email) {
      console.log("Required body elements are missing !!");
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

    /* Check user already verified or not */
    if (user.verified === true) {
      return res.status(204).json({
        success: false,
        statusmessage: "No Content",
        message: "User already verified",
      });
    }

    /* Send email to the client */
    await SendVerificationEmail(email, user.verificationToken);

    /* Response Sucess */
    return res.status(200).json({
      success: true,
      statusmessage: "OK",
      message: "Verification Link Sent successfully in the Email",
    });
  } catch (err) {
    /* Response Error */
    console.log("Error: Resending the token is failed" + err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default ResendVerificationToken;
