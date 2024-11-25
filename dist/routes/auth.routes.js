"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', auth_controller_1.default.signUp);
authRouter.post('/login', auth_controller_1.default.login);
authRouter.post('/admin-login', auth_controller_1.default.adminLogin);
exports.default = authRouter;
