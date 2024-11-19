"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("../models/material");
const addMaterial = async (req, res, next) => {
    try {
        const { vehicle_picture, weight_picture, slip_picture, audio, remark, rst, vehicle_number, material, final_weight } = req.body;
        const addedMaterial = await material_1.Material.create({
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
        res.status(200).json({ status: 200, message: 'Material added successfully', addedMaterial });
    }
    catch (error) {
        next(error);
    }
};
const addStone = async (req, res, next) => {
    try {
        const { vehicle_picture, weight_picture, slip_picture, audio, remark, rst, vehicle_number, final_weight } = req.body;
        const addedStone = await material_1.Material.create({
            vehicle_picture,
            weight_picture,
            slip_picture,
            audio,
            remark,
            rst,
            vehicle_number,
            final_weight
        });
        res.status(200).json({ status: 200, message: 'Stone added successfully', addedStone });
    }
    catch (error) {
        next(error);
    }
};
const addExtra = async (req, res, next) => {
    try {
        const { vehicle_picture, audio, remark, } = req.body;
        const addedExtra = await material_1.Material.create({
            vehicle_picture,
            audio,
            remark,
        });
        res.status(200).json({ status: 200, message: 'Extra added successfully', addedExtra });
    }
    catch (error) {
        next(error);
    }
};
const userController = { addMaterial, addStone, addExtra };
exports.default = userController;
