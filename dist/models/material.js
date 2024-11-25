"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const mongoose_1 = require("mongoose");
const MaterialSchema = new mongoose_1.Schema({
    vehicle_picture: { type: String, required: false },
    weight_picture: { type: String, required: false },
    category: { type: String, required: false },
    size: { type: String, required: false },
    slip_picture: { type: String, required: false },
    audio: { type: String, required: false },
    remark: { type: String, required: false },
    rst: { type: String, required: false },
    vehicle_number: { type: String, required: false },
    material: { type: String, required: false },
    final_weight: { type: String, required: false },
    created_by: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
}, {
    timestamps: true
});
exports.Material = mongoose_1.models.Material || (0, mongoose_1.model)('Material', MaterialSchema);
