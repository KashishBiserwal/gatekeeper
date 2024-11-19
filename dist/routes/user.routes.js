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
exports.default = userRouter;
