import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    isActive: {type: Boolean, default: true},
    employeeId: {type: String, required: false},
    created_at: {type: Date, default: Date.now},
}, {
    timestamps: true
})

export const User = models.User || model('User', UserSchema)