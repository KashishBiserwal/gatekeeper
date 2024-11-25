import { Router } from "express";
import adminController from "../controller/admin.controller";


const adminRouter = Router()

//@ts-ignore
adminRouter.get('/users', adminController.getAllUsers)
adminRouter.delete('/delete-user/:userId', adminController.deleteUser)
adminRouter.put('/edit-user/:userId', adminController.editUser)
adminRouter.get('/get-user/:userId', adminController.getUserById)

//@ts-ignore
adminRouter.put('/switch/:userId', adminController.switchUser)

adminRouter.post('/set-bills', adminController.setBills)

adminRouter.get('/get-bills', adminController.getBills)

adminRouter.put('/edit-bill/:id', adminController.editBill)

adminRouter.delete('/delete-bill/:id', adminController.deleteBill)

adminRouter.get('/get-bill/:id', adminController.getBillById)

adminRouter.get('/get-all-audio', adminController.getAllAudio)

adminRouter.delete('/delete-old-materials', adminController.deleteOldMaterials)

adminRouter.delete('/delete-old-stones', adminController.deleteOldStones)

adminRouter.delete('/delete-old-extras', adminController.deleteOldExtras)



export default adminRouter