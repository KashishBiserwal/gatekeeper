import type {Request, Response, NextFunction } from 'express'
import helper from '../utils/helpers'
import { User } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ExtendedRequest } from '../utils/middleware'
import { getUserToken } from '..'
import { Material } from '../models/material'

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({status: 200, users});
    } catch (error) {
        next(error);
    }
}

const deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({status: 404, message: 'User not found'});
        }
        user.isActive = false;
        await user.save();
        res.status(200).json({status: 200, message: 'User deactivated successfully'});
    } catch (error) {
        return next(error);
    }
}

const activateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({status: 404, message: 'User not found'});
        }
        user.isActive = true;
        await user.save();
        res.status(200).json({status: 200, message: 'User activated successfully'});
    } catch (error) {
        return next(error);
    }
}


const adminController = { getAllUsers, deactivateUser, activateUser }
export default adminController