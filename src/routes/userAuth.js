import express from 'express';
import RegisterController from '../controllers/RegisterController.js'
import LoginController from '../controllers/LoginController.js'
import UserVerifyEmail from '../controllers/UserVerifyEmail.js';
import ResendVerificationToken from '../controllers/ResendVerificationToken.js';
import PasswordChangeOTP from '../controllers/PasswordChangeOTP.js';
import PasswordChange from '../controllers/PasswordChange.js';


const userAuth = express.Router();
    userAuth
        .post("/register", RegisterController)
        .post("/login", LoginController)
        .get("/verify/:email/:verificationToken", UserVerifyEmail)
        .post("/verify/resendtoken", ResendVerificationToken)
        .post("/passwordchangeotp", PasswordChangeOTP)
        .patch("/passwordchange", PasswordChange)

export default userAuth;