import type { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
import { Material } from '../models/material'
import { Billing } from '../models/billing'

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
        res.status(200).json({ status: 200, users });
    } catch (error) {
        next(error);
    }
}

const switchUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        user.isActive = !user.isActive;
        await user.save();
        res.status(200).json({ status: 200, message: 'User switched successfully' });
    } catch (error) {
        return next(error);
    }
}
//post

const setBills = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract form data from the request body
        const { name, rstno, vehicle_number } = req.body;

        // Auto-generate bill number using current timestamp
        const bill_id = `BILLNO.${Date.now()}`;

        // Validate the data (optional but recommended)
        if (!name) {
            return res.status(400).json({ message: "Name is required." });
        }

        // Create a new billing document
        const newBilling = new Billing({
            name,
            rstno,
            vehicle_number,
            bill_id,
        });

        // Save the document to the database
        const savedBilling = await newBilling.save();

        // Return the saved document as a response
        res.status(201).json({
            message: "Billing record created successfully.",
            data: savedBilling,
        });
    } catch (error) {
        // Handle errors
        console.error("Error creating billing record:", error);
        res.status(500).json({
            message: "An error occurred while creating the billing record.",
            error: error,
        });
    }
};
// get
const getBills = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query; // Optional query parameter for a specific record

        if (id) {
            // Retrieve a specific billing record by ID
            const bill = await Billing.findById(id);
            if (!bill) {
                return res.status(404).json({ message: "Billing record not found." });
            }
            return res.status(200).json({ data: bill });
        }

        // Retrieve all billing records
        const bills = await Billing.find();
        res.status(200).json({ data: bills });
    } catch (error) {
        console.error("Error retrieving billing records:", error);
        res.status(500).json({
            message: "An error occurred while retrieving billing records.",
            error: error,
        });
    }
};


//edit

const editBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // ID from route parameter
        const { name, rstno, vehicle_number } = req.body;

        // Find the billing record by ID and update it
        const updatedBill = await Billing.findByIdAndUpdate(
            id,
            { name, rstno, vehicle_number },
            { new: true, runValidators: true } // Return updated document and validate fields
        );

        if (!updatedBill) {
            return res.status(404).json({ message: "Billing record not found." });
        }

        res.status(200).json({
            message: "Billing record updated successfully.",
            data: updatedBill,
        });
    } catch (error) {
        console.error("Error updating billing record:", error);
        res.status(500).json({
            message: "An error occurred while updating the billing record.",
            error: error,
        });
    }
};

// delete

const deleteBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // ID from route parameter

        // Find the billing record by ID and delete it
        const deletedBill = await Billing.findByIdAndDelete(id);

        if (!deletedBill) {
            return res.status(404).json({ message: "Billing record not found." });
        }

        res.status(200).json({
            message: "Billing record deleted successfully.",
            data: deletedBill,
        });
    } catch (error) {
        console.error("Error deleting billing record:", error);
        res.status(500).json({
            message: "An error occurred while deleting the billing record.",
            error: error,
        });
    }
};

// get by id

const getBillById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Extract ID from route parameters

        // Find the billing record by ID
        const bill = await Billing.findById(id);

        if (!bill) {
            return res.status(404).json({ message: "Billing record not found." });
        }

        res.status(200).json({
            message: "Billing record retrieved successfully.",
            data: bill,
        });
    } catch (error) {
        console.error("Error retrieving billing record:", error);
        res.status(500).json({
            message: "An error occurred while retrieving the billing record.",
            error: error,
        });
    }
};


export default { getAllUsers, switchUser, setBills, getBills, editBill, deleteBill, getBillById };