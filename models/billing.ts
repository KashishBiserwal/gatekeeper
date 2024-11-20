import { Schema, model, models } from "mongoose";

const BillingSchema = new Schema({
    name: { type: String, required: false },
    rstno: { type: String, required: false },
    vehicle_number: { type: String, required: false },
    bill_id: { type: String, required: false },
});

export const Billing = models.Billing || model("Billing", BillingSchema);
