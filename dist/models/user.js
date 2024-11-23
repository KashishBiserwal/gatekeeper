"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isActive: { type: Boolean, default: true },
    employeeId: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
}, {
    timestamps: true
});
exports.User = mongoose_1.models.User || (0, mongoose_1.model)('User', UserSchema);
