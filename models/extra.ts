import { Schema, model, models } from "mongoose";

const ExtraSchema = new Schema({
    vehicle_picture: {type: String, required: false},
    audio: {type: String, required: false},
    remark: {type: String, required: false},
})

export const Extra = models.Extra || model('Extra', ExtraSchema)