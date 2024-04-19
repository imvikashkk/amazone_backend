import nodemailer from "nodemailer";

const SendVerificationEmail = async (email, verificationToken) => {
  /* Creating Nodemailer Transporter */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vikashkhunte2003@gmail.com",
      pass: "csow lmvj cwum lubq",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: '"Amazone 👻" <amazone@vikash.com>',
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: https://amazone-backend.vercel.app/api/user/auth/verify/${email}/${verificationToken}`,
  };

  /* Send Email */
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

export default SendVerificationEmail;
