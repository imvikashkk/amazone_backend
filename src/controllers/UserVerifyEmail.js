import User from "../models/User.js";

const UserVerifyEmail = async (req, res) => {
  try {
    /* Access Verification Token from URI */
    const token = req.params.verificationToken;
    const email = req.params.email;

    /* Find the user with the given verification token */
    const user = await User.findOne({
      email: email,
      verificationToken: token,
    });

    /* if user not fount with that particular verification token */
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Verifiation Token" });
    }

    /* Mark The User as Verified */
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    /* Response success */
    return res.status(200).json({
      success: true,
      message: "Verified Successfully",
    });
  } catch (err) {
    /* Response Error */
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error: Email Verificatio Failed",
    });
  }
};

export default UserVerifyEmail;
