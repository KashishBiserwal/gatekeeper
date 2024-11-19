"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("../models/material");
const stone_1 = require("../models/stone");
const extra_1 = require("../models/extra");
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
        const addedStone = await stone_1.Stone.create({
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
        const addedExtra = await extra_1.Extra.create({
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
const getMaterial = async (req, res, next) => {
    try {
        const materials = await material_1.Material.find();
        res.status(200).json({ status: 200, materials });
    }
    catch (error) {
        next(error);
    }
};
const getStone = async (req, res, next) => {
    try {
        const stones = await stone_1.Stone.find();
        res.status(200).json({ status: 200, stones });
    }
    catch (error) {
        next(error);
    }
};
const getExtra = async (req, res, next) => {
    try {
        const extras = await extra_1.Extra.find();
        res.status(200).json({ status: 200, extras });
    }
    catch (error) {
        next(error);
    }
};
const getMaterialById = async (req, res, next) => {
    try {
        const { materialId } = req.params;
        const material = await material_1.Material.findById(materialId);
        if (!material) {
            return res.status(404).json({ status: 404, message: 'Material not found' });
        }
        res.status(200).json({ status: 200, material });
    }
    catch (error) {
        next(error);
    }
};
const getStoneById = async (req, res, next) => {
    try {
        const { stoneId } = req.params;
        const stone = await stone_1.Stone.findById(stoneId);
        if (!stone) {
            return res.status(404).json({ status: 404, message: 'Stone not found' });
        }
        res.status(200).json({ status: 200, stone });
    }
    catch (error) {
        next(error);
    }
};
const getExtraById = async (req, res, next) => {
    try {
        const { extraId } = req.params;
        const extra = await extra_1.Extra.findById(extraId);
        if (!extra) {
            return res.status(404).json({ status: 404, message: 'Extra not found' });
        }
        res.status(200).json({ status: 200, extra });
    }
    catch (error) {
        next(error);
    }
};
const editMaterialById = async (req, res, next) => {
    try {
        const { materialId } = req.params;
        const { remark, rst, vehicle_number, material, final_weight } = req.body;
        const materialToEdit = await material_1.Material.findByIdAndUpdate(materialId, {
            remark,
            rst,
            vehicle_number,
            material,
            final_weight
        }, { new: true });
        if (!materialToEdit) {
            return res.status(404).json({ status: 404, message: 'Material not found' });
        }
        res.status(200).json({ status: 200, message: 'Material updated successfully', materialToEdit });
    }
    catch (error) {
        next(error);
    }
};
const editStoneById = async (req, res, next) => {
    try {
        const { stoneId } = req.params;
        const { remark, rst, vehicle_number, final_weight } = req.body;
        const stoneToEdit = await stone_1.Stone.findByIdAndUpdate(stoneId, {
            remark,
            rst,
            vehicle_number,
            final_weight
        }, { new: true });
        if (!stoneToEdit) {
            return res.status(404).json({ status: 404, message: 'Stone not found' });
        }
        res.status(200).json({ status: 200, message: 'Stone updated successfully', stoneToEdit });
    }
    catch (error) {
        next(error);
    }
};
const editExtraById = async (req, res, next) => {
    try {
        const { extraId } = req.params;
        const { remark, } = req.body;
        const extraToEdit = await extra_1.Extra.findByIdAndUpdate(extraId, {
            remark,
        }, { new: true });
        if (!extraToEdit) {
            return res.status(404).json({ status: 404, message: 'Extra not found' });
        }
        res.status(200).json({ status: 200, message: 'Extra updated successfully', extraToEdit });
    }
    catch (error) {
        next(error);
    }
};
const userController = { addMaterial, addStone, addExtra, getMaterial, getStone, getExtra, getMaterialById, getStoneById, getExtraById, editMaterialById, editStoneById, editExtraById };
exports.default = userController;
