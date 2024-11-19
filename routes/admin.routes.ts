import { Router } from "express";
import adminController from "../controller/admin.controller";

const adminRouter = Router()

//@ts-ignore
adminRouter.get('/users', adminController.getAllUsers)

//@ts-ignore
adminRouter.put('/switch/:userId', adminController.switchUser)


export default adminRouter