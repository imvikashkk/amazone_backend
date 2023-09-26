import User from "../models/User.js";
import jwt from "jsonwebtoken";
import secretKey from "../utils/secretKey.js";
import bcrypt from "bcrypt";

const LoginController = async (req, res) => {
  try {
    /* Access parsed required body element */
    const { email, password } = req.body;

    /* check required body exist or not */
    if (!email || !password) {
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

    /* Check password correct or not */
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        statusmessage: "Unauthorized",
        message: "Email Address and Password did not match !!",
      });
    }

    /* Check User Verified or Not */
    if (user.verified === false) {
      return res.status(202).json({
        success: false,
        statusmessage: "Accepted",
        message: "User is not verified !!",
      });
    }

    /* Generate Token */
    const token = jwt.sign({ userId: user._id }, secretKey);

    /* Response Success */
    return res.status(200).json({
      success: true,
      statusmessage: "OK",
      message: "Logged In. Token Genrated successfully !!",
      data: {
        name: user.name,
        token: token,
      },
    });
  } catch (err) {
    /* Response Error */
    console.log("Error: LoginError : ", err);
    return res.status(500).json({
      success: false,
      statusmessage: "Internal Server Error",
      message: "An error occurred while Logging In",
      error: err,
    });
  }
};

export default LoginController;
