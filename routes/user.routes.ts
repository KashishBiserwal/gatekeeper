import { Router } from "express";
import userController from "../controller/user.controller";
import fileUpload from "express-fileupload";

const userRouter = Router()
userRouter.use(fileUpload());

userRouter.post('/get-audio', userController.getAudio);
//@ts-ignore
userRouter.post('/material', userController.addMaterial)
//@ts-ignore
userRouter.post('/stone', userController.addStone)
//@ts-ignore
userRouter.post('/extra', userController.addExtra)
//@ts-ignore
userRouter.get('/materials', userController.getMaterial)
//@ts-ignore
userRouter.get('/stones', userController.getStone)
//@ts-ignore
userRouter.get('/extras', userController.getExtra)
//@ts-ignore
userRouter.get('/material/:materialId', userController.getMaterialById)
//@ts-ignore
userRouter.get('/stone/:stoneId', userController.getStoneById)
//@ts-ignore
userRouter.get('/extra/:extraId', userController.getExtraById)
//@ts-ignore
userRouter.put('/material/:materialId', userController.editMaterialById)
//@ts-ignore
userRouter.put('/stone/:stoneId', userController.editStoneById)
//@ts-ignore
userRouter.put('/extra/:extraId', userController.editExtraById)

userRouter.delete('/material/:materialId', userController.deleteMaterialById)

userRouter.delete('/stone/:stoneId', userController.deleteStoneById)

userRouter.delete('/extra/:extraId', userController.deleteExtraById)




export default userRouter