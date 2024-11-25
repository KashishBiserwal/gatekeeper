"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extra = void 0;
const mongoose_1 = require("mongoose");
const ExtraSchema = new mongoose_1.Schema({
    vehicle_picture: { type: String, required: false },
    audio: { type: String, required: false },
    remark: { type: String, required: false },
    category: { type: String, required: false },
    created_by: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
}, {
    timestamps: true
});
exports.Extra = mongoose_1.models.Extra || (0, mongoose_1.model)('Extra', ExtraSchema);
