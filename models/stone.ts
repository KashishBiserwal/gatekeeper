import { Schema, model, models } from "mongoose";

const StoneSchema = new Schema({
    vehicle_picture: {type: String, required: false},
    weight_picture: {type: String, required: false},
    slip_picture: {type: String, required: false},
    audio: {type: String, required: false},
    remark: {type: String, required: false},
    rst: {type: String, required: false},
    vehicle_number: {type: String, required: false},
    final_weight: {type: String, required: false},
    category: {type: String, required: false},
    created_at: {type: Date, default: Date.now},
}, 
{
    timestamps: true
})

export const Stone = models.Stone || model('Stone', StoneSchema)