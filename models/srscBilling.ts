import { Schema, model, models } from "mongoose";

const srscBillingSchema = new Schema(
    {
        counter: { type: Number, required: true, default: 0 },
        rstno: { type: String },
        vehicle_number: { type: String },
        category: { type: String },
        bill_id: { type: String },
        material: { type: String },
        status: { type: Number },
    },
    { timestamps: true }
);

// Auto-increment the counter field (if needed)
srscBillingSchema.pre("save", async function (next) {
    if (this.isNew) {
        const lastRecord = await models.srscBilling.findOne().sort({ createdAt: -1 });
        this.counter = lastRecord ? lastRecord.counter + 1 : 1; // Start from 1 if no records exist
    }
    next();
});

export const SRSCBilling = models.srscBilling || model("srscBilling", srscBillingSchema);

