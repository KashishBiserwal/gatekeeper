"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controller/admin.controller"));
const adminRouter = (0, express_1.Router)();
//@ts-ignore
adminRouter.get('/users', admin_controller_1.default.getAllUsers);
//@ts-ignore
adminRouter.put('/deactivate/:userId', admin_controller_1.default.deactivateUser);
//@ts-ignore
adminRouter.put('/activate/:userId', admin_controller_1.default.activateUser);
exports.default = adminRouter;
