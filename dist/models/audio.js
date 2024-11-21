"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audio = void 0;
const mongoose_1 = require("mongoose");
const audioScema = new mongoose_1.Schema({
    name: { type: String, required: false },
}, { timestamps: true });
exports.Audio = mongoose_1.models.Audio || (0, mongoose_1.model)("Audio", audioScema);
