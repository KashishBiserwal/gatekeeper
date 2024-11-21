import { Schema, model, models } from "mongoose";

const audioScema = new Schema({
    name: { type: String, required: false },
}, { timestamps: true });

export const Audio = models.Audio || model("Audio", audioScema);
