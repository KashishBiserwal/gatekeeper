"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const userRouter = (0, express_1.Router)();
//@ts-ignore
userRouter.post('/material', user_controller_1.default.addMaterial);
//@ts-ignore
userRouter.post('/stone', user_controller_1.default.addStone);
//@ts-ignore
userRouter.post('/extra', user_controller_1.default.addExtra);
//@ts-ignore
userRouter.get('/materials', user_controller_1.default.getMaterial);
//@ts-ignore
userRouter.get('/stones', user_controller_1.default.getStone);
//@ts-ignore
userRouter.get('/extras', user_controller_1.default.getExtra);
//@ts-ignore
userRouter.get('/material/:materialId', user_controller_1.default.getMaterialById);
//@ts-ignore
userRouter.get('/stone/:stoneId', user_controller_1.default.getStoneById);
//@ts-ignore
userRouter.get('/extra/:extraId', user_controller_1.default.getExtraById);
//@ts-ignore
userRouter.put('/material/:materialId', user_controller_1.default.editMaterialById);
//@ts-ignore
userRouter.put('/stone/:stoneId', user_controller_1.default.editStoneById);
//@ts-ignore
userRouter.put('/extra/:extraId', user_controller_1.default.editExtraById);
userRouter.delete('/material/:materialId', user_controller_1.default.deleteMaterialById);
userRouter.delete('/stone/:stoneId', user_controller_1.default.deleteStoneById);
userRouter.delete('/extra/:extraId', user_controller_1.default.deleteExtraById);
exports.default = userRouter;
