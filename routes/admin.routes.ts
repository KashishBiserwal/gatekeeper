import { Router } from "express";
import adminController from "../controller/admin.controller";


const adminRouter = Router()

//@ts-ignore
adminRouter.get('/users', adminController.getAllUsers)

//@ts-ignore
adminRouter.put('/switch/:userId', adminController.switchUser)

adminRouter.post('/set-bills', adminController.setBills)

adminRouter.get('/get-bills', adminController.getBills)

adminRouter.put('/edit-bill/:id', adminController.editBill)

adminRouter.delete('/delete-bill/:id', adminController.deleteBill)

adminRouter.get('/get-bill/:id', adminController.getBillById)

export default adminRouter