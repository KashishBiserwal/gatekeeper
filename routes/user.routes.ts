import { Router } from "express";
import userController from "../controller/user.controller";

const userRouter = Router()

//@ts-ignore
userRouter.post('/material', userController.addMaterial)
//@ts-ignore
userRouter.post('/stone', userController.addStone)
//@ts-ignore
userRouter.post('/extra', userController.addExtra)


export default userRouter