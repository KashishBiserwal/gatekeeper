"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const AuthMiddleware = async (req, res, next) => {
    const token = req.headers?.authorization;
    if (!token) {
        return res.status(200).send({
            status: 400,
            error: 'Authentication failed',
            error_description: 'token is required',
        });
    }
    const splittedToken = token.split(' ');
    if (splittedToken[0] !== 'Bearer') {
        return res.status(200).send({
            status: 400,
            error: 'Authentication failed',
            error_description: 'Invalid token type',
        });
    }
    let decryptedToken;
    try {
        decryptedToken = jsonwebtoken_1.default.verify(splittedToken[1], process.env.JWT_SECRET);
    }
    catch (err) {
        return next(err);
    }
    const employeeId = decryptedToken?.employeeId;
    if (!employeeId) {
        const err = new Error("Error: token doens't contain phone");
        return next(err);
    }
    const user = await user_1.User.findOne({ employeeId });
    if (!user) {
        return res.status(200).send({ status: 400, error: 'user not found.', error_description: 'Account had closed.' });
    }
    delete user?.password;
    req.user = user;
    next();
};
const middleware = { AuthMiddleware };
exports.default = middleware;
