import { Router } from "express";
import adminController from "../controller/admin.controller";

const adminRouter = Router()

//@ts-ignore
adminRouter.get('/users', adminController.getAllUsers)

//@ts-ignore
adminRouter.put('/deactivate/:userId', adminController.deactivateUser)

//@ts-ignore
adminRouter.put('/activate/:userId', adminController.activateUser)


export default adminRouter