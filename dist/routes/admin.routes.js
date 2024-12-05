"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controller/admin.controller"));
const adminRouter = (0, express_1.Router)();
//@ts-ignore
adminRouter.get('/users', admin_controller_1.default.getAllUsers);
adminRouter.delete('/delete-user/:userId', admin_controller_1.default.deleteUser);
adminRouter.put('/edit-user/:userId', admin_controller_1.default.editUser);
adminRouter.get('/get-user/:userId', admin_controller_1.default.getUserById);
//@ts-ignore
adminRouter.put('/switch/:userId', admin_controller_1.default.switchUser);
adminRouter.post('/set-bills-bsc', admin_controller_1.default.setBillsBsc);
adminRouter.get('/get-bill-bsc/:id', admin_controller_1.default.getBillByIdBsc);
adminRouter.put('/reset-bsc-counter', admin_controller_1.default.resetBscCounter);
adminRouter.post('/set-bills-srsc', admin_controller_1.default.setBillsSrsc);
adminRouter.get('/get-bill-srsc/:id', admin_controller_1.default.getBillByIdSrsc);
adminRouter.put('/reset-srsc-counter', admin_controller_1.default.resetSrscCounter);
adminRouter.post('/set-bills-ssc', admin_controller_1.default.setBillsSsc);
adminRouter.get('/get-bill-ssc/:id', admin_controller_1.default.getBillByIdSsc);
adminRouter.put('/reset-ssc-counter', admin_controller_1.default.resetSscCounter);
adminRouter.get('/bsc-bill-count', admin_controller_1.default.getBscBillCounter);
adminRouter.get('/srsc-bill-count', admin_controller_1.default.getSrscBillCounter);
adminRouter.get('/ssc-bill-count', admin_controller_1.default.getSscBillCounter);
adminRouter.get('/bsc-bill', admin_controller_1.default.getBscBills);
adminRouter.get('/srsc-bill', admin_controller_1.default.getSrscBills);
adminRouter.get('/ssc-bill', admin_controller_1.default.getSscBills);
adminRouter.delete('/delete-bsc/:id', admin_controller_1.default.deleteBscBillByBillId);
adminRouter.delete('/delete-srsc/:id', admin_controller_1.default.deleteSrscBillByBillId);
adminRouter.delete('/delete-ssc/:id', admin_controller_1.default.deleteSscBillByBillId);
// adminRouter.get('/get-bills', adminController.getBills)
// adminRouter.put('/edit-bill/:id', adminController.editBill)
// adminRouter.delete('/delete-bill/:id', adminController.deleteBill)
adminRouter.get('/get-all-audio', admin_controller_1.default.getAllAudio);
adminRouter.delete('/delete-old-materials', admin_controller_1.default.deleteOldMaterials);
adminRouter.delete('/delete-old-stones', admin_controller_1.default.deleteOldStones);
adminRouter.delete('/delete-old-extras', admin_controller_1.default.deleteOldExtras);
exports.default = adminRouter;
