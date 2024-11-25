import { Router } from "express";
import authController from "../controller/auth.controller";
import middleware from "../utils/middleware";
import { auth } from "firebase-admin";

const authRouter = Router()

authRouter.post('/signup', authController.signUp)
authRouter.post('/login', authController.login)
authRouter.post('/admin-login', authController.adminLogin)

export default authRouter