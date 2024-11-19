import type {Request, Response, NextFunction } from 'express'
import helper from '../utils/helpers'
import { User } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ExtendedRequest } from '../utils/middleware'
import { getUserToken } from '..'
import { Material } from '../models/material'


const addMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            vehicle_picture,
            weight_picture,
            slip_picture,
            audio,
            remark,
            rst,
            vehicle_number,
            material,
            final_weight
        } = req.body;

        const addedMaterial = await Material.create({
            vehicle_picture,
            weight_picture,
            slip_picture,
            audio,
            remark,
            rst,
            vehicle_number,
            material,
            final_weight
        });

        res.status(200).json({status: 200, message: 'Material added successfully', addedMaterial });
    } catch (error) {
        next(error);
    }
}

const addStone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            vehicle_picture,
            weight_picture,
            slip_picture,
            audio,
            remark,
            rst,
            vehicle_number,
            final_weight
        } = req.body;

        const addedStone = await Material.create({
            vehicle_picture,
            weight_picture,
            slip_picture,
            audio,
            remark,
            rst,
            vehicle_number,
            final_weight
        });

        res.status(200).json({status: 200, message: 'Stone added successfully', addedStone });
    } catch (error) {
        next(error);
    }
}

const addExtra = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            vehicle_picture,
            audio,
            remark,
        } = req.body;

        const addedExtra = await Material.create({
            vehicle_picture,
            audio,
            remark,
        });

        res.status(200).json({status: 200, message: 'Extra added successfully', addedExtra });
    } catch (error) {
        next(error);
    }
}

const userController = { addMaterial, addStone, addExtra }
export default userController