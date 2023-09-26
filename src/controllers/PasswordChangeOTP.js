import User from "../models/User.js";
import nodemailer from "nodemailer";

const PasswordChangeOTP = async (req, res) => {
  try {

    /* Access Body element from parsed body */
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

    /* OTP Creation */
    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000; // 6 digit OTP
    user.otp = otp;
    await user.save();

    /* OTP Sending */
    const otpSend = SendOtp(email, otp);
    if (!otpSend) {
        console.log("Failed to send OTP !!");
        return res.status(450).json({
          success: false,
          statusmessage: "SMTP Error",
          message:
            "OTP could not be sent.",
        });
      }

    const time = 1000 * 60 * 10; // validation for 10 minutes only
    /* After 10 minutes delete the otp value from database */
    setTimeout(async () => {
      user.otp = undefined;
      await user.save();
    }, time);


    /* Response Success */
    return res.status(200).json({
      success: true,
      message: "OTP is sent successfully !",
    });

  } catch (err) {
    /* Response Error */
    console.log("Error: at OTP Sending", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* OTP for Password Change */
const SendOtp = async (email, otp) => {
  /* Creating Nodemailer Transporter */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vikashkhunte2003@gmail.com",
      pass: "wqojfmgeaqiykjyd",
    },
  });

  /* OTP Send */
  const mailOptions = {
    from: '"Amazone 👻" <amazone@vikash.com>',
    to: email,
    subject: "OTP",
    text: `Your OTP is : ${otp} valid for 10 minutes only`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

export default PasswordChangeOTP;
