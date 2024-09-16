import mongoose from 'mongoose';
import UserModel from "../models/User.js"; // Adjust the path as necessary
import FireFightUserModel from '../models/FireFight.js'; // Adjust the path as necessary
import TechnicianUserModel from '../models/technician.js';

const selectModel = (department) => {
    switch (department) {
        case 'Electrician':
            return UserModel;
        case 'FireFight':
            return FireFightUserModel;
        case 'Technician':
            return TechnicianUserModel;

        
        default:
            throw new Error('Invalid department');
    }
};

const CreateUser = async (req, res) => {
    try {
        const { department } = req.params; // Extract department from URL params
        const { srno, Assets, ComponentsAndEquipments, AvailableStock, MinStock, LeadTime, ExcessShortFall, StatusofOrder } = req.body;

        // Validate required fields
        if (!srno || !Assets || !ComponentsAndEquipments) {
            return res.status(400).json({ success: false, Message: 'Missing required fields' });
        }

        // Select the appropriate model based on department
        const Model = selectModel(department);

        // Create a new document based on the selected model
        const newUser = new Model({
            srno,
            Assets,
            ComponentsAndEquipments,
            AvailableStock,
            MinStock,
            LeadTime,
            ExcessShortFall,
            StatusofOrder
        });

        // Save the new document
        await newUser.save();
        res.status(201).json({ success: true, Message: 'User created successfully', newUser });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ success: false, Message: 'Internal server error', error: error.message });
    }
};

const GetUser = async (req, res) => {
    try {
        const { department } = req.params; // Extract department from URL params
        const Model = selectModel(department);

        const users = await Model.find();
        if (users.length === 0) {
            return res.status(404).json({ success: false, Message: 'No users found' });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ success: false, Message: 'Internal server error', error: error.message });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const { department, id } = req.params; // Extract department and id from URL params
        const Model = selectModel(department);

        const updatedUser = await Model.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, Message: 'User not found' });
        }
        res.status(200).json({ success: true, Message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ success: false, Message: 'Internal server error', error: error.message });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const { department, id } = req.params; // Extract department and id from URL params
        const Model = selectModel(department);

        const deletedUser = await Model.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, Message: 'User not found' });
        }
        res.status(200).json({ success: true, Message: 'User deleted successfully', deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ success: false, Message: 'Internal server error', error: error.message });
    }
};

const getProductById = async (req, res) => {
    const { department, id } = req.params; // Extract department and id from URL params
    try {
        const Model = selectModel(department);
        const product = await Model.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Controller to get product details for update
const getProductForUpdate = async (req, res) => {
    const { department, id } = req.params; // Extract department and id from URL params
    try {
        const Model = selectModel(department);
        const product = await Model.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export { CreateUser, GetUser, UpdateUser, DeleteUser, getProductById, getProductForUpdate };
