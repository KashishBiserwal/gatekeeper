"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __importDefault(require("../utils/helpers"));
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const signUp = async (req, res, next) => {
    const isValidPayload = helpers_1.default.isValidatePaylod(req.body, ['name', 'phone', 'password']);
    if (!isValidPayload) {
        return res.status(400).send({ error: 'Invalid payload', error_message: 'name, phone, password are required' });
    }
    const { name, phone, password, employeeId } = req.body;
    try {
        const existingUser = await user_1.User.findOne({ phone });
        if (existingUser) {
            return res.status(400).send({ status: 400, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await user_1.User.create({
            name,
            phone,
            password: hashedPassword,
            employeeId
        });
        const token = jsonwebtoken_1.default.sign({ phone: req.body.phone }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        return res.status(200).send({ status: 200, message: 'User created successfully', token });
    }
    catch (err) {
        return res.status(500).send({ message: 'Error creating user' });
    }
};
const login = async (req, res, next) => {
    const isValidPaylod = helpers_1.default.isValidatePaylod(req.body, ['employeeId', 'password']);
    if (!isValidPaylod) {
        return res.status(400).send({ error: "Invalid payload", error_message: "phone, password are required" });
    }
    const { employeeId, password } = req.body;
    try {
        const user = await user_1.User.findOne({ employeeId });
        if (!user)
            return res.status(400).send({ message: "User doesn't exist" });
        const isCorrectPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).send({ status: 400, message: "Incorrect Password" });
        }
        const token = jsonwebtoken_1.default.sign({ employeeId: user.employeeId }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        await user.save();
        const receiverToken = await (0, __1.getUserToken)(user.id);
        console.log('Receiver Token:', receiverToken);
        if (!receiverToken) {
            console.log('Receiver not found or has no registration token', user.id);
        }
        else {
            const payload = {
                title: 'Welcome',
                body: `Welcome to Frek App, ${user.name}!`
            };
        }
        return res.status(200).send({ status: 200, message: "Logged in successfully", user, token });
    }
    catch (err) {
        return res.status(500).send({ error: 'Error while Login' });
    }
};
const updatePassword = async (req, res, next) => {
    const isValidPayload = helpers_1.default.isValidatePaylod(req.body, ['oldPassword', 'newPassword']);
    if (!isValidPayload) {
        return res.status(400).send({ error: 'Invalid payload', error_message: 'oldPassword, newPassword are required' });
    }
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    try {
        if (!user)
            return res.status(400).send({ status: 400, message: 'User not found' });
        const isCorrectPassword = bcrypt_1.default.compareSync(oldPassword, user.password);
        if (!isCorrectPassword) {
            return res.status(400).send({ message: 'Incorrect old password' });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await user_1.User.findByIdAndUpdate(user._id, { password: hashedPassword });
        return res.status(200).send({ status: 200, message: 'Password updated successfully' });
    }
    catch (err) {
        return res.status(500).send({ status: 500, message: 'Error updating password' });
    }
};
const resetPassword = async (req, res, next) => {
    // Validate payload to ensure required fields are present
    const isValidPayload = helpers_1.default.isValidatePaylod(req.body, ['phone', 'password']);
    if (!isValidPayload) {
        return res.status(400).send({ error: 'Invalid payload', error_message: 'phone and password are required' });
    }
    const { phone, password } = req.body;
    try {
        // Find the user by phone
        const user = await user_1.User.findOne({ phone });
        if (!user) {
            return res.status(404).send({ status: 400, message: 'User not found' });
        }
        // Hash the new password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Update the user's password and last_seen timestamp
        await user_1.User.findByIdAndUpdate(user._id, { password: hashedPassword });
        return res.status(200).send({ status: 200, message: 'Password reset successfully' });
    }
    catch (err) {
        return res.status(500).send({ status: 500, message: 'Error resetting password' });
    }
};
const authController = { signUp, login, updatePassword, resetPassword };
exports.default = authController;
