import type {Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
import { Material } from '../models/material'

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({status: 200, users});
    } catch (error) {
        next(error);
    }
}

const switchUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({status: 404, message: 'User not found'});
        }
        user.isActive = !user.isActive;
        await user.save();
        res.status(200).json({status: 200, message: 'User switched successfully'});
    } catch (error) {
        return next(error);
    }
}


const adminController = { getAllUsers, switchUser }
export default adminController