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
adminRouter.put('/switch/:userId', admin_controller_1.default.switchUser);
adminRouter.post('/set-bills', admin_controller_1.default.setBills);
adminRouter.get('/get-bills', admin_controller_1.default.getBills);
adminRouter.put('/edit-bill/:id', admin_controller_1.default.editBill);
adminRouter.delete('/delete-bill/:id', admin_controller_1.default.deleteBill);
exports.default = adminRouter;
