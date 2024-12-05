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




adminRouter.post('/set-bills-bsc', adminController.setBillsBsc)

adminRouter.get('/get-bill-bsc/:id', adminController.getBillByIdBsc)

adminRouter.put('/reset-bsc-counter', adminController.resetBscCounter)


adminRouter.post('/set-bills-srsc', adminController.setBillsSrsc)

adminRouter.get('/get-bill-srsc/:id', adminController.getBillByIdSrsc)

adminRouter.put('/reset-srsc-counter', adminController.resetSrscCounter)


adminRouter.post('/set-bills-ssc', adminController.setBillsSsc)

adminRouter.get('/get-bill-ssc/:id', adminController.getBillByIdSsc)

adminRouter.put('/reset-ssc-counter', adminController.resetSscCounter)

adminRouter.get('/bsc-bill-count', adminController.getBscBillCounter)

adminRouter.get('/srsc-bill-count', adminController.getSrscBillCounter)

adminRouter.get('/ssc-bill-count', adminController.getSscBillCounter)

adminRouter.get('/bsc-bill', adminController.getBscBills)

adminRouter.get('/srsc-bill', adminController.getSrscBills)

adminRouter.get('/ssc-bill', adminController.getSscBills)   

adminRouter.delete('/delete-bsc/:id', adminController.deleteBscBillByBillId)

adminRouter.delete('/delete-srsc/:id', adminController.deleteSrscBillByBillId)

adminRouter.delete('/delete-ssc/:id', adminController.deleteSscBillByBillId)

// adminRouter.get('/get-bills', adminController.getBills)

// adminRouter.put('/edit-bill/:id', adminController.editBill)

// adminRouter.delete('/delete-bill/:id', adminController.deleteBill)



adminRouter.get('/get-all-audio', adminController.getAllAudio)

adminRouter.delete('/delete-old-materials', adminController.deleteOldMaterials)

adminRouter.delete('/delete-old-stones', adminController.deleteOldStones)

adminRouter.delete('/delete-old-extras', adminController.deleteOldExtras)



export default adminRouter