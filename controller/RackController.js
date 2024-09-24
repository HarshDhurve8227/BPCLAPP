import Rack1 from "../models/Racks/Rack1.js";
import Rack2 from "../models/Racks/Rack2.js";
import Rack3 from "../models/Racks/Rack3.js";
import Rack4 from "../models/Racks/Rack4.js";
import Rack5 from "../models/Racks/Rack5.js";
import Rack6 from "../models/Racks/Rack6.js";
import Rack7 from "../models/Racks/Rack7.js";
import Rack8 from "../models/Racks/Rack8.js";
import Rack9 from "../models/Racks/Rack9.js";
import Rack10 from "../models/Racks/Rack10.js";
import Rack11 from "../models/Racks/Rack11.js";
import Rack12 from "../models/Racks/Rack12.js";
import Rack13 from "../models/Racks/Rack13.js";
import Rack14 from "../models/Racks/Rack14.js";
import Rack15 from "../models/Racks/Rack15.js";
import Rack16 from "../models/Racks/Rack16.js";
import Rack17 from "../models/Racks/Rack17.js";
import Rack18 from "../models/Racks/Rack18.js";
import Rack19 from "../models/Racks/Rack19.js";
import Rack20 from "../models/Racks/Rack20.js";
import Rack21 from "../models/Racks/Rack21.js";
import Rack22 from "../models/Racks/Rack22.js";
import Rack23 from "../models/Racks/Rack23.js";
import Rack24 from "../models/Racks/Rack24.js";

const rackModels = {
    rack1: Rack1,
    rack2: Rack2,
    rack3: Rack3,
    rack4: Rack4,
    rack5: Rack5,
    rack6: Rack6,
    rack7: Rack7,
    rack8: Rack8,
    rack9: Rack9,
    rack10: Rack10,
    rack11: Rack11,
    rack12: Rack12,
    rack13: Rack13,
    rack14: Rack14,
    rack15: Rack15,
    rack16: Rack16,
    rack17: Rack17,
    rack18: Rack18,
    rack19: Rack19,
    rack20: Rack20,
    rack21: Rack21,
    rack22: Rack22,
    rack23: Rack23,
    rack24: Rack24,
};

// Create a new item in the specified rack
export const addItemToRack = async (req, res) => {
    const rackType = req.params.rackType; // Get rackType from URL parameters
    const { itemData } = req.body;
    console.log("Received data:", req.body);

    const RackModel = rackModels[rackType.toLowerCase()];
    if (!RackModel) {
        return res.status(400).json({ success: false, message: 'Invalid rack type' });
    }

    // Validate itemData fields
    const requiredFields = ['section', 'materialName', 'availableStock', 'closingStock'];
    for (const field of requiredFields) {
        if (itemData[field] === undefined || itemData[field] === null || itemData[field] === '') {
            return res.status(400).json({ success: false, message: `${field} is required` }); // Fixed string interpolation
        }
    }

    // Check for negative values
    if (itemData.availableStock < 0 || itemData.issue < 0 || itemData.closingStock < 0) {
        return res.status(400).json({ success: false, message: 'Stock values must be non-negative' });
    }

    try {
        const newItem = new RackModel(itemData);
        await newItem.save();
        res.status(201).json({ success: true, newItem });
    } catch (error) {
        console.error('Error inserting item:', error);
        res.status(500).json({ success: false, message: 'Error inserting item', error: error.message });
    }
};




// Update an item in the specified rack
export const updateItemInRack = async (req, res) => {
    const { rackType, itemId } = req.params;
    const itemData = req.body;

    const RackModel = rackModels[rackType.toLowerCase()];
    if (!RackModel) {
        return res.status(400).json({ message: 'Invalid rack type' });
    }

    try {
        const updatedItem = await RackModel.findByIdAndUpdate(itemId, itemData, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
};

// Get all items in the specified rack
export const getItemsInRack = async (req, res) => {
    const { rackType } = req.params;

    const RackModel = rackModels[rackType.toLowerCase()];
    if (!RackModel) {
        return res.status(400).json({ message: 'Invalid rack type' });
    }

    try {
        const items = await RackModel.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error });
    }
};

// Delete an item from the specified rack
export const deleteItemFromRack = async (req, res) => {
    const { rackType, itemId } = req.params;

    const RackModel = rackModels[rackType.toLowerCase()];
    if (!RackModel) {
        return res.status(400).json({ message: 'Invalid rack type' });
    }

    try {
        const deletedItem = await RackModel.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully', deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};
