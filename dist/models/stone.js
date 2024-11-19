"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stone = void 0;
const mongoose_1 = require("mongoose");
const StoneSchema = new mongoose_1.Schema({
    vehicle_picture: { type: String, required: false },
    weight_picture: { type: String, required: false },
    slip_picture: { type: String, required: false },
    audio: { type: String, required: false },
    remark: { type: String, required: false },
    rst: { type: String, required: false },
    vehicle_number: { type: String, required: false },
    final_weight: { type: String, required: false }
});
exports.Stone = mongoose_1.models.Stone || (0, mongoose_1.model)('Stone', StoneSchema);
