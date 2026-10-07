import { Router } from "express";
import * as authController from "./controller/auth.controller.js";

const authRouter = Router();
 authRouter.post("/register", authController.register);
authRouter.patch("/verify-account", authController.verifyAccount);
authRouter.post("/login", authController.login);
authRouter.post("/resend-otp", authController.resendOTP);
authRouter.patch("/change-password", authController.changePassword);
authRouter.post("/google-login", authController.googleLogin);
 
export default authRouter;