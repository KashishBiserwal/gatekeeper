import { Schema, model, models } from "mongoose";

const MaterialSchema = new Schema({
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
    created_by: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
}, {
    timestamps: true
})

export const Material = models.Material || model('Material', MaterialSchema)