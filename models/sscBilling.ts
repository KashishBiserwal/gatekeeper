import { Schema, model, models } from "mongoose";

const sscBillingSchema = new Schema(
    {
        counter: { type: Number, required: true, default: 0 },
        rstno: { type: String },
        vehicle_number: { type: String },
        category: { type: String },
        bill_id: { type: String },
        material: { type: String }, // Corrected key spelling
    },
    { timestamps: true }
);

// Auto-increment the counter field (if needed)
sscBillingSchema.pre("save", async function (next) {
    if (this.isNew) {
        const lastRecord = await models.sscBilling.findOne().sort({ createdAt: -1 });
        this.counter = lastRecord ? lastRecord.counter + 1 : 1; // Start from 1 if no records exist
    }
    next();
});

export const SSCBilling = models.sscBilling || model("sscBilling", sscBillingSchema);
