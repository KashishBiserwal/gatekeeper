"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Billing = void 0;
const mongoose_1 = require("mongoose");
const BillingSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    rstno: { type: String, required: false },
    vehicle_number: { type: String, required: false },
    bill_id: { type: String, required: false },
});
exports.Billing = mongoose_1.models.Billing || (0, mongoose_1.model)("Billing", BillingSchema);
