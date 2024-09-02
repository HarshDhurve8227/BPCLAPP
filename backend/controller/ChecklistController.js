// controller/ChecklistController.js
import Checklist from "../models/ChecklistA11.js"; // Import the Checklist model

// Controller to handle saving checklist data
// ChecklistController.js
export const saveChecklist = async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const checklist = new Checklist(req.body);
        await checklist.save();
        res.status(201).send('Form saved successfully');
    } catch (error) {
        console.error('Error saving form:', error);
        res.status(500).send('Error saving form');
    }
};
