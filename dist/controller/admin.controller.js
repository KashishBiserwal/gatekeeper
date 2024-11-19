"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const getAllUsers = async (req, res, next) => {
    try {
        const users = await user_1.User.find().select('-password');
        res.status(200).json({ status: 200, users });
    }
    catch (error) {
        next(error);
    }
};
const switchUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await user_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        user.isActive = !user.isActive;
        await user.save();
        res.status(200).json({ status: 200, message: 'User switched successfully' });
    }
    catch (error) {
        return next(error);
    }
};
const adminController = { getAllUsers, switchUser };
exports.default = adminController;
