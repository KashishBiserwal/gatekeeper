import type { Request, Response, NextFunction } from 'express'
import helper from '../utils/helpers'
import { User } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ExtendedRequest } from '../utils/middleware'
import { getUserToken } from '..'

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const isValidPayload = helper.isValidatePaylod(req.body, ['name', 'phone', 'password'])
    if (!isValidPayload) {
        return res.status(400).send({ error: 'Invalid payload', error_message: 'name, phone, password are required' })
    }
    const { name, phone, password, employeeId } = req.body
    try {
        const existingUser = await User.findOne({ phone })
        if (existingUser) {
            return res.status(400).send({ status: 400, message: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            phone,
            password: hashedPassword,
            employeeId
        })
        const token = jwt.sign({ phone: req.body.phone }, process.env.JWT_SECRET!, {
            expiresIn: '7d'
        })
        return res.status(200).send({ status: 200, message: 'User created successfully', token })
    } catch (err) {
        return res.status(500).send({ message: 'Error creating user' })
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const isValidPaylod = helper.isValidatePaylod(req.body, ['employeeId', 'password'])
    if (!isValidPaylod) {
        return res.status(400).send({ error: "Invalid payload", error_message: "phone, password are required" })
    }
    const { employeeId, password } = req.body
    try {
        const user = await User.findOne({ employeeId })
        if (!user) return res.status(400).send({ message: "User doesn't exist" })
        const isCorrectPassword = bcrypt.compareSync(password, user.password)
        if (!isCorrectPassword) {
            return res.status(400).send({ status: 400, message: "Incorrect Password" })
        }
        const token = jwt.sign({ employeeId: user.employeeId }, process.env.JWT_SECRET!, {
            expiresIn: '7d'
        })
        await user.save()
        const receiverToken = await getUserToken(user.id);
        console.log('Receiver Token:', receiverToken);
        if (!receiverToken) {
            console.log('Receiver not found or has no registration token', user.id);
        } else {
            const payload = {
                title: 'Welcome',
                body: `Welcome to Frek App, ${user.name}!`
            };
        }
        return res.status(200).send({ status: 200, message: "Logged in successfully", user, token })
    } catch (err) {
        return res.status(500).send({ error: 'Error while Login' })
    }
}

const updatePassword = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const isValidPayload = helper.isValidatePaylod(req.body, ['oldPassword', 'newPassword'])
    if (!isValidPayload) {
        return res.status(400).send({ error: 'Invalid payload', error_message: 'oldPassword, newPassword are required' })
    }
    const { oldPassword, newPassword } = req.body
    const user = req.user
    try {
        if (!user) return res.status(400).send({ status: 400, message: 'User not found' })
        const isCorrectPassword = bcrypt.compareSync(oldPassword, user.password)
        if (!isCorrectPassword) {
            return res.status(400).send({ message: 'Incorrect old password' })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await User.findByIdAndUpdate(user._id, { password: hashedPassword })
        return res.status(200).send({ status: 200, message: 'Password updated successfully' })
    } catch (err) {
        return res.status(500).send({ status: 500, message: 'Error updating password' })
    }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    // Validate payload to ensure required fields are present
    const isValidPayload = helper.isValidatePaylod(req.body, ['phone', 'password']);
    if (!isValidPayload) {
        return res.status(400).send({ error: 'Invalid payload', error_message: 'phone and password are required' });
    }

    const { phone, password } = req.body;

    try {
        // Find the user by phone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).send({ status: 400, message: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password and last_seen timestamp
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        return res.status(200).send({ status: 200, message: 'Password reset successfully' });
    } catch (err) {
        return res.status(500).send({ status: 500, message: 'Error resetting password' });
    }
};


const authController = { signUp, login, updatePassword, resetPassword }
export default authController