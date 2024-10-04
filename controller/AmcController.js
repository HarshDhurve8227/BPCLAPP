import Equipment from "../models/AMC.js";

// Create a new equipment
export const addEquipment = async (req, res) => {
    const equipmentData = req.body;

    try {
        const newEquipment = new Equipment(equipmentData);
        await newEquipment.save();
        res.status(201).json({ success: true, newEquipment });
    } catch (error) {
        console.error('Error adding equipment:', error);
        res.status(500).json({ success: false, message: 'Error adding equipment', error: error.message });
    }
};

// Get all equipment
export const getEquipments = async (req, res) => {
    try {
        const equipments = await Equipment.find();
        res.status(200).json(equipments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving equipment', error });
    }
};

// Update an equipment
export const updateEquipment = async (req, res) => {
    const { id } = req.params;
    const equipmentData = req.body;

    try {
        const updatedEquipment = await Equipment.findByIdAndUpdate(id, equipmentData, { new: true });
        if (!updatedEquipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json(updatedEquipment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating equipment', error });
    }
};

// Delete an equipment
export const deleteEquipment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEquipment = await Equipment.findByIdAndDelete(id);
        if (!deletedEquipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json({ message: 'Equipment deleted successfully', deletedEquipment });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting equipment', error });
    }
};
