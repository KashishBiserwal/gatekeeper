"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("../models/material");
const stone_1 = require("../models/stone");
const extra_1 = require("../models/extra");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAudio = async (req, res, next) => {
    try {
        // Check if a file is uploaded
        if (!req.files || !req.files.audio) {
            return res.status(400).json({ error: "No audio file provided" });
        }
        // Extract the uploaded file
        const audioFile = req.files.audio;
        // Ensure the file is valid
        if (!audioFile || Array.isArray(audioFile) || !audioFile.mimetype.startsWith("audio/")) {
            return res.status(400).json({ error: "Invalid audio file" });
        }
        // Generate a unique filename
        const uniqueName = `audio_${Date.now()}${path_1.default.extname(audioFile.name)}`;
        // Define the directory to save the file
        const uploadDir = path_1.default.join(__dirname, "../uploads");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        // Define the full path for the uploaded file
        const uploadPath = path_1.default.join(uploadDir, uniqueName);
        // Move the file to the upload directory
        await audioFile.mv(uploadPath);
        // Save the file path to the database (example logic)
        const audioUrl = `uploads/${uniqueName}`;
        // Replace with your database save logic
        // await User.create({ audioPath: audioUrl });
        // Return the file URL
        res.status(200).json({ audioUrl });
    }
    catch (error) {
        console.error("Error handling audio file upload:", error);
        res.status(500).json({ error: "Failed to upload audio file" });
    }
};
// upload images
const getImage = async (req, res, next) => {
    try {
        // Check if a file is uploaded
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: "No image file provided" });
        }
        // Extract the uploaded file
        const imageFile = req.files.image;
        // Validate the file type and ensure it's a single file
        const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!imageFile ||
            Array.isArray(imageFile) ||
            !allowedMimeTypes.includes(imageFile.mimetype)) {
            return res.status(400).json({ error: "Invalid image file. Allowed types: jpg, jpeg, png, webp" });
        }
        // Generate a unique filename
        const uniqueName = `image_${Date.now()}${path_1.default.extname(imageFile.name)}`;
        // Define the directory to save the file
        const uploadDir = path_1.default.join(__dirname, "../uploads/images");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        // Define the full path for the uploaded file
        const uploadPath = path_1.default.join(uploadDir, uniqueName);
        // Move the file to the upload directory
        await imageFile.mv(uploadPath);
        // Save the file path to the database (example logic)
        const imageUrl = `uploads/images/${uniqueName}`;
        // Replace with your database save logic
        // await User.create({ imagePath: imageUrl });
        // Return the file URL
        res.status(200).json({ imageUrl });
    }
    catch (error) {
        console.error("Error handling image file upload:", error);
        res.status(500).json({ error: "Failed to upload image file" });
    }
};
const addMaterial = async (req, res, next) => {
    const userId = req.user;
    const userName = req.user.name;
    try {
        const { vehicle_picture, weight_picture, slip_picture, audio, remark, rst, vehicle_number, material, final_weight, category, size } = req.body;
        if (!category) {
            return res.status(400).json({ status: 400, message: 'Category is required' });
        }
        const addedMaterial = await material_1.Material.create({
            vehicle_picture,
            weight_picture,
            slip_picture,
            audio,
            remark,
            rst,
            vehicle_number,
            material,
            final_weight,
            category,
            size,
            created_by: userName
        });
        res.status(200).json({ status: 200, message: 'Material added successfully', addedMaterial });
    }
    catch (error) {
        next(error);
    }
};
const addStone = async (req, res, next) => {
    const userName = req.user.name;
    try {
        const { vehicle_picture, weight_picture, slip_picture, audio, remark, rst, vehicle_number, final_weight, category } = req.body;
        if (!category) {
            return res.status(400).json({ status: 400, message: 'Category is required' });
        }
        const addedStone = await stone_1.Stone.create({
            vehicle_picture,
            weight_picture,
            slip_picture,
            audio,
            remark,
            rst,
            vehicle_number,
            final_weight,
            category,
            created_by: userName
        });
        res.status(200).json({ status: 200, message: 'Stone added successfully', addedStone });
    }
    catch (error) {
        next(error);
    }
};
const addExtra = async (req, res, next) => {
    const userName = req.user.name;
    try {
        const { vehicle_picture, audio, remark, category } = req.body;
        if (!category) {
            return res.status(400).json({ status: 400, message: 'Category is required' });
        }
        const addedExtra = await extra_1.Extra.create({
            vehicle_picture,
            audio,
            remark,
            category,
            created_by: userName
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
        const { remark, rst, vehicle_number, material, final_weight, category, size } = req.body;
        const materialToEdit = await material_1.Material.findByIdAndUpdate(materialId, {
            remark,
            rst,
            vehicle_number,
            material,
            final_weight,
            category,
            size
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
        const { remark, rst, vehicle_number, final_weight, category } = req.body;
        const stoneToEdit = await stone_1.Stone.findByIdAndUpdate(stoneId, {
            remark,
            rst,
            vehicle_number,
            final_weight,
            category
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
        const { remark, category } = req.body;
        const extraToEdit = await extra_1.Extra.findByIdAndUpdate(extraId, {
            remark,
            category
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
const deleteMaterialById = async (req, res, next) => {
    try {
        const { materialId } = req.params;
        const material = await material_1.Material.findByIdAndDelete(materialId);
        if (!material) {
            return res.status(404).json({ status: 404, message: 'Material not found' });
        }
        res.status(200).json({ status: 200, message: 'Material deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
const deleteStoneById = async (req, res, next) => {
    try {
        const { stoneId } = req.params;
        const stone = await stone_1.Stone.findByIdAndDelete(stoneId);
        if (!stone) {
            return res.status(404).json({ status: 404, message: 'Stone not found' });
        }
        res.status(200).json({ status: 200, message: 'Stone deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
const deleteExtraById = async (req, res, next) => {
    try {
        const { extraId } = req.params;
        const extra = await extra_1.Extra.findByIdAndDelete(extraId);
        if (!extra) {
            return res.status(404).json({ status: 404, message: 'Extra not found' });
        }
        res.status(200).json({ status: 200, message: 'Extra deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
const userController = { addMaterial, addStone, addExtra, getMaterial, getStone, getExtra, getMaterialById, getStoneById, getExtraById, editMaterialById, editStoneById, editExtraById, deleteMaterialById, deleteStoneById, deleteExtraById, getAudio, getImage };
exports.default = userController;
