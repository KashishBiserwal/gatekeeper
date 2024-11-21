"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const audioSchema = new mongoose_1.Schema({
    name: { type: String, required: false }, // `required: false` is not necessary as it's the default
}, { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);
// Use an existing model if it exists, otherwise create a new one
const Audio = mongoose_1.models.Audio || (0, mongoose_1.model)("Audio", audioSchema);
exports.default = Audio;
