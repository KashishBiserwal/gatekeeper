import type { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
import { Material } from '../models/material'
import { BSCBilling } from '../models/bscBilling'
import bcrypt from 'bcrypt'
import { hash } from 'crypto'
import { Extra } from '../models/extra'
import { Stone } from '../models/stone'
import { SRSCBilling } from '../models/srscBilling'
import { SSCBilling } from '../models/sscBilling'

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


// delete user by id

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ status: 404, message: 'User not found' });
        }
        res.status(200).send({ status: 200, message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}

// edit user by id, name, mobile, password

const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { name, mobile, password } = req.body;

        // Validate input
        if (!userId) {
            return res.status(400).json({ status: 400, message: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        // Update user fields
        if (name) user.name = name;
        if (mobile) user.phone = mobile;
        if (password) user.password = await bcrypt.hash(password, 10);

        // Save changes
        const updatedUser = await user.save();

        // Remove sensitive fields before sending response
        const { password: _, ...userWithoutPassword } = updatedUser.toObject();

        res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        next(error); // Forward error to the global error handler
    }
};

// get user by id

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        res.status(200).json({ status: 200, user });
    } catch (error) {
        next(error);
    }
}


//post

const setBillsBsc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Log the request body to debug issues;
        // console.log("Request body:", req.body);

        // Extract form data from the request body
        const { rstno, vehicle_number, category, material } = req.body;

        // Validate required fields
        if (!rstno || !vehicle_number || !category || !material) {
            return res.status(400).json({
                message: "Missing required fields. Please provide all the necessary details.",
            });
        }

        // Auto-generate bill number using current timestamp
        const bill_id = `BILLNO.${Date.now()}`;

        // Create a new billing document
        const newBilling = new BSCBilling({
            rstno,
            vehicle_number,
            bill_id,
            category,
            material
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

// reset BSC counter

const resetBscCounter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Update all documents in the BSCBilling collection, setting counter to 0
        const result = await BSCBilling.updateMany({}, { $set: { counter: 0 } });

        // Respond with the result of the update operation
        res.status(200).json({
            message: "All counters have been reset to 0.",
            modifiedCount: result.modifiedCount,
        });
    } catch (error) {
        console.error("Error resetting counters:", error);
        res.status(500).json({
            message: "An error occurred while resetting the counters.",
            error: error,
        });
    }
};

const getBscBillCounter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lastDoc = await BSCBilling.findOne().sort({ createdAt: -1 });
        const count = await lastDoc.counter;

        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting BSC billing count:", error);
        res.status(500).json({
            message: "An error occurred while getting the BSC billing count.",
            error: error,
        });
    }
} 

const getBscBills = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const bills = await BSCBilling.find();
        res.status(200).json({bills});
    }catch(error){
        console.error("Error getting BSC bills:", error);
        res.status(500).json({
            message: "An error occurred while getting the BSC bills.",
            error: error,
        });
    }
}

const getSrscBills = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const bills = await SRSCBilling.find();
        res.status(200).json({bills});
    }catch(error){
        console.error("Error getting SRSC bills:", error);
        res.status(500).json({
            message: "An error occurred while getting the SRSC bills.",
            error: error,
        });
    }
}

const getSscBills = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const bills = await SSCBilling.find();
        res.status(200).json({bills});
    }catch(error){
        console.error("Error getting SSC bills:", error);
        res.status(500).json({
            message: "An error occurred while getting the SSC bills.",
            error: error,
        });
    }
}

const getSrscBillCounter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lastDoc = await SRSCBilling.findOne().sort({ createdAt: -1 });
        const count = await lastDoc.counter;

        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting SRSC billing count:", error);
        res.status(500).json({
            message: "An error occurred while getting the SRSC billing count.",
            error: error,
        });
    }
}

const getSscBillCounter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lastDoc = await SSCBilling.findOne().sort({ createdAt: -1 });
        const count = await lastDoc.counter;

        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting SSC billing count:", error);
        res.status(500).json({
            message: "An error occurred while getting the SSC billing count.",
            error: error,
        });
    }
}


// set srsc billing

const setBillsSrsc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Log the request body to debug issues;
        // console.log("Request body:", req.body);

        // Extract form data from the request body
        const { rstno, vehicle_number, category, material } = req.body;

        // Validate required fields
        if (!rstno || !vehicle_number || !category || !material) {
            return res.status(400).json({
                message: "Missing required fields. Please provide all the necessary details.",
            });
        }

        // Auto-generate bill number using current timestamp
        const bill_id = `BILLNO.${Date.now()}`;

        // Create a new billing document
        const newBilling = new SRSCBilling({
            rstno,
            vehicle_number,
            bill_id,
            category,
            material
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

// get srsc by id
const getBillByIdSrsc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Extract ID from route parameters
        // Find the billing record by ID
        const bill = await SRSCBilling.findById(id);
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


// reset srsc counter

const resetSrscCounter = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Update all documents in the SRSCBilling collection, setting counter to 0
        const result = await SRSCBilling.updateMany({}, { $set: { counter: 0 } });

        // Respond with the result of the update operation
        res.status(200).json({
            message: "All counters have been reset to 0.",
            modifiedCount: result.modifiedCount,
        });
    } catch (error) {
        console.error("Error resetting counters:", error);
        res.status(500).json({
            message: "An error occurred while resetting the counters.",
            error: error,
        });
    }

}



// set ssc billing

const setBillsSsc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Log the request body to debug issues;
        // console.log("Request body:", req.body);

        // Extract form data from the request body
        const { rstno, vehicle_number, category, material } = req.body;

        // Validate required fields
        if (!rstno || !vehicle_number || !category || !material) {
            return res.status(400).json({
                message: "Missing required fields. Please provide all the necessary details.",
            });
        }

        // Auto-generate bill number using current timestamp
        const bill_id = `BILLNO.${Date.now()}`;

        // Create a new billing document
        const newBilling = new SSCBilling({
            rstno,
            vehicle_number,
            bill_id,
            category,
            material
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

}


// get ssc by id

const getBillByIdSsc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Extract ID from route parameters
        // Find the billing record by ID
        const bill = await SSCBilling.findById(id);
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
}

// reset ssc counter

const resetSscCounter = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Update all documents in the SSCBilling collection, setting counter to 0
        const result = await SSCBilling.updateMany({}, { $set: { counter: 0 } });

        // Respond with the result of the update operation
        res.status(200).json({
            message: "All counters have been reset to 0.",
            modifiedCount: result.modifiedCount,
        });
    } catch (error) {
        console.error("Error resetting counters:", error);
        res.status(500).json({
            message: "An error occurred while resetting the counters.",
            error: error,
        });
    }

}



// get
// const getBills = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.query; // Optional query parameter for a specific record

//         if (id) {
//             // Retrieve a specific billing record by ID
//             const bill = await Billing.findById(id);
//             if (!bill) {
//                 return res.status(404).json({ message: "Billing record not found." });
//             }
//             return res.status(200).json({ data: bill });
//         }

//         // Retrieve all billing records
//         const bills = await Billing.find();
//         res.status(200).json({ data: bills });
//     } catch (error) {
//         console.error("Error retrieving billing records:", error);
//         res.status(500).json({
//             message: "An error occurred while retrieving billing records.",
//             error: error,
//         });
//     }
// };


//edit

// const editBill = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params; // ID from route parameter
//         const { name, rstno, vehicle_number } = req.body;

//         // Find the billing record by ID and update it
//         const updatedBill = await Billing.findByIdAndUpdate(
//             id,
//             { name, rstno, vehicle_number },
//             { new: true, runValidators: true } // Return updated document and validate fields
//         );

//         if (!updatedBill) {
//             return res.status(404).json({ message: "Billing record not found." });
//         }

//         res.status(200).json({
//             message: "Billing record updated successfully.",
//             data: updatedBill,
//         });
//     } catch (error) {
//         console.error("Error updating billing record:", error);
//         res.status(500).json({
//             message: "An error occurred while updating the billing record.",
//             error: error,
//         });
//     }
// };

// delete

// const deleteBill = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params; // ID from route parameter

//         // Find the billing record by ID and delete it
//         const deletedBill = await Billing.findByIdAndDelete(id);

//         if (!deletedBill) {
//             return res.status(404).json({ message: "Billing record not found." });
//         }

//         res.status(200).json({
//             message: "Billing record deleted successfully.",
//             data: deletedBill,
//         });
//     } catch (error) {
//         console.error("Error deleting billing record:", error);
//         res.status(500).json({
//             message: "An error occurred while deleting the billing record.",
//             error: error,
//         });
//     }
// };

// get by id

const getBillByIdBsc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Extract ID from route parameters

        // Find the billing record by ID
        const bill = await BSCBilling.findById(id);

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

const getAllAudio = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Query all three models and filter for audio length > 1
        const materialAudios = await Material.find({
            audio: { $exists: true, $type: "string", $ne: "", $regex: /^.{2,}/ }
        });

        const extraAudios = await Extra.find({
            audio: { $exists: true, $type: "string", $ne: "", $regex: /^.{2,}/ }
        });

        const stoneAudios = await Stone.find({
            audio: { $exists: true, $type: "string", $ne: "", $regex: /^.{2,}/ }
        });

        // Combine all results into one array
        const allAudios = [...materialAudios, ...extraAudios, ...stoneAudios];

        // Return the combined results
        res.status(200).json({ data: allAudios });
    } catch (error) {
        console.error("Error retrieving audio:", error);
        res.status(500).json({
            message: "An error occurred while retrieving audio.",
            error: error || error,
        });
    }
};

// delete 3 month old materials

const deleteOldMaterials = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Calculate the date for 3 months ago
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        // Delete documents where `created_at` is older than the calculated date
        const result = await Material.deleteMany({ created_at: { $lt: threeMonthsAgo } });

        // Send a success response with the number of deleted documents
        res.status(200).json({
            message: 'Old materials deleted successfully.',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error('Error deleting old materials:', error);
        res.status(500).json({
            message: 'An error occurred while deleting old materials.',
            error,
        });
    }
};


// delete 3 month old Stones

const deleteOldStones = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Calculate the date for 3 months ago
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        // Delete documents where `created_at` is older than the calculated date
        const result = await Stone.deleteMany({ created_at: { $lt: threeMonthsAgo } });

        // Send a success response with the number of deleted documents
        res.status(200).json({
            message: 'Old Stones deleted successfully.',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error('Error deleting old Stones:', error);
        res.status(500).json({
            message: 'An error occurred while deleting old Stones.',
            error,
        });
    }
};


// delete 3 month old extras

const deleteOldExtras = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Calculate the date for 3 months ago
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        // Delete documents where `created_at` is older than the calculated date
        const result = await Extra.deleteMany({ created_at: { $lt: threeMonthsAgo } });

        // Send a success response with the number of deleted documents
        res.status(200).json({
            message: 'Old extras deleted successfully.',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error('Error deleting old extras:', error);
        res.status(500).json({
            message: 'An error occurred while deleting old extras.',
            error,
        });
    }
};





export default { getAllUsers, switchUser, setBillsBsc, getBillByIdBsc, deleteUser, editUser, getUserById, getAllAudio, deleteOldMaterials, deleteOldStones, deleteOldExtras, resetBscCounter, setBillsSrsc, getBillByIdSrsc, resetSrscCounter, setBillsSsc, resetSscCounter, getBillByIdSsc, getSrscBillCounter, getSscBillCounter, getBscBillCounter, getBscBills, getSrscBills, getSscBills };