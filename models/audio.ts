import { Schema, model, models } from "mongoose";

const audioSchema = new Schema(
    {
        name: { type: String, required: false }, // `required: false` is not necessary as it's the default
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Use an existing model if it exists, otherwise create a new one
const Audio = models.Audio || model("Audio", audioSchema);

export default Audio;
