"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRSCBilling = void 0;
const mongoose_1 = require("mongoose");
const srscBillingSchema = new mongoose_1.Schema({
    counter: { type: Number, required: true, default: 0 },
    rstno: { type: String },
    vehicle_number: { type: String },
    category: { type: String },
    bill_id: { type: String },
    material: { type: String },
    status: { type: Number },
}, { timestamps: true });
// Auto-increment the counter field (if needed)
srscBillingSchema.pre("save", async function (next) {
    if (this.isNew) {
        const lastRecord = await mongoose_1.models.srscBilling.findOne().sort({ createdAt: -1 });
        this.counter = lastRecord ? lastRecord.counter + 1 : 1; // Start from 1 if no records exist
    }
    next();
});
exports.SRSCBilling = mongoose_1.models.srscBilling || (0, mongoose_1.model)("srscBilling", srscBillingSchema);
