import User from "../models/User.js";
import crypto from "crypto";
import SendVerificationEmail from "../utils/SendVerificationEmail.js";

const RegisterController = async (req, res) => {
  try {
    /* Access parsed required body element */
    const { name, email, password } = req.body;
    console.log(password);

    /* check required body exist or not */
    if (!name || !email || !password) {
      console.log("Required body elements are missing !!");
      return res.status(400).json({
        success: false,
        statusmessage: "Bad Request",
        message: "Required body elements are missing !!",
      });
    }

    /* check the user already registered  or not */
    const user = await User.findOne({ email }); // Access details from Database
    if (user) {
      console.log("Email Already Registered: ", email);
      return res.status(403).json({
        success: false,
        statusmessage: "Already Exists",
        message: "Email already registered !!",
      });
    }

    /* Generate and store the verification token */
    const VT = crypto.randomBytes(20).toString("hex");


    /* Send Verification Link through Email */
    const emailResult = await SendVerificationEmail(email, VT);
    if (!emailResult) {
      console.log("Failed to send verification link !!");
      return res.status(450).json({
        success: false,
        statusmessage: "SMTP Error",
        message:
          "Your message was not delivered because the other user mailbox was not available.",
      });
    }

    /* create a new user */
    const newUser = new User({
      name,
      email,
      password,
      verificationToken: VT,
    });

    /* Save the user to database */
    await newUser.save();

    /* Finally Success Response */
    return res.status(201).json({
      success: true,
      statusmessage: "Created",
      message: "Registration successful !!, Please check your email",
      password
    });

  } catch (err) {
    /* Response Error */
    console.log("Error: Registration : ", err);
    return res.status(500).json({
      success: false,
      statusmessage: "Internal Server Error",
      message: "An error occured while Registration",
      error: err,
    });
  }
};

export default RegisterController;


/* NOTE :  */
// Password will be encryped in Modal before save.
