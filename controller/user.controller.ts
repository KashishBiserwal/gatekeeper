import type {Request, Response, NextFunction } from 'express'
import helper from '../utils/helpers'
import { User } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ExtendedRequest } from '../utils/middleware'
import { getUserToken } from '..'
import { Material } from '../models/material'
import { Stone } from '../models/stone'
import { Extra } from '../models/extra'


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
            final_weight,
            category
        } = req.body;
        if(!category){
            return res.status(400).json({status: 400, message: 'Category is required'});
        }

        const addedMaterial = await Material.create({
            vehicle_picture,
            weight_picture,
            slip_picture,
            audio,
            remark,
            rst,
            vehicle_number,
            material,
            final_weight,
            category
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
            final_weight,
            category
        } = req.body;

        if(!category){
            return res.status(400).json({status: 400, message: 'Category is required'});
        }

        const addedStone = await Stone.create({
            vehicle_picture,
            weight_picture,
            slip_picture,
            audio,
            remark,
            rst,
            vehicle_number,
            final_weight,
            category
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
            category
        } = req.body;

        if(!category){
            return res.status(400).json({status: 400, message: 'Category is required'});
        }

        const addedExtra = await Extra.create({
            vehicle_picture,
            audio,
            remark,
            category
        });

        res.status(200).json({status: 200, message: 'Extra added successfully', addedExtra });
    } catch (error) {
        next(error);
    }
}

const getMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const materials = await Material.find();
        res.status(200).json({status: 200, materials});
    } catch (error) {
        next(error);
    }
}
const getStone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stones = await Stone.find();
        res.status(200).json({status: 200, stones});
    } catch (error) {
        next(error);
    }
}
const getExtra = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const extras = await Extra.find();
        res.status(200).json({status: 200, extras});
    } catch (error) {
        next(error);
    }
}

const getMaterialById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { materialId } = req.params;
        const material = await Material.findById(materialId);
        if (!material) {
            return res.status(404).json({status: 404, message: 'Material not found'});
        }
        res.status(200).json({status: 200, material});
    } catch (error) {
        next(error);
    }
}

const getStoneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stoneId } = req.params;
        const stone = await Stone.findById(stoneId);
        if (!stone) {
            return res.status(404).json({status: 404, message: 'Stone not found'});
        }
        res.status(200).json({status: 200, stone});
    } catch (error) {
        next(error);
    }
}

const getExtraById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { extraId } = req.params;
        const extra = await Extra.findById(extraId);
        if (!extra) {
            return res.status(404).json({status: 404, message: 'Extra not found'});
        }
        res.status(200).json({status: 200, extra});
    } catch (error) {
        next(error);
    }
}

const editMaterialById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { materialId } = req.params;
        const {
            remark,
            rst,
            vehicle_number,
            material,
            final_weight,
            category
        } = req.body;

        const materialToEdit = await Material.findByIdAndUpdate(materialId, {
            remark,
            rst,
            vehicle_number,
            material,
            final_weight,
            category
        }, { new: true });

        if (!materialToEdit) {
            return res.status(404).json({status: 404, message: 'Material not found'});
        }

        res.status(200).json({status: 200, message: 'Material updated successfully', materialToEdit});
    } catch (error) {
        next(error);
    }
}

const editStoneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stoneId } = req.params;
        const {
            remark,
            rst,
            vehicle_number,
            final_weight,
            category
        } = req.body;

        const stoneToEdit = await Stone.findByIdAndUpdate(stoneId, {
            remark,
            rst,
            vehicle_number,
            final_weight,
            category
        }, { new: true });

        if (!stoneToEdit) {
            return res.status(404).json({status: 404, message: 'Stone not found'});
        }

        res.status(200).json({status: 200, message: 'Stone updated successfully', stoneToEdit});
    } catch (error) {
        next(error);
    }
}

const editExtraById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { extraId } = req.params;
        const {
            remark,
            category
        } = req.body;

        const extraToEdit = await Extra.findByIdAndUpdate(extraId, {
            remark,
            category
        }, { new: true });

        if (!extraToEdit) {
            return res.status(404).json({status: 404, message: 'Extra not found'});
        }

        res.status(200).json({status: 200, message: 'Extra updated successfully', extraToEdit});
    } catch (error) {
        next(error);
    }
}

const userController = { addMaterial, addStone, addExtra, getMaterial, getStone, getExtra, getMaterialById, getStoneById, getExtraById, editMaterialById, editStoneById, editExtraById }
export default userController