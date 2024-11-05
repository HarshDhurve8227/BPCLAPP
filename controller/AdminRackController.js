import Rack1A from '../models/CupboardRacks/Rack1A.js';
import Rack1B from '../models/CupboardRacks/Rack1B.js';
import Rack1C from '../models/CupboardRacks/Rack1C.js';
import Rack1D from '../models/CupboardRacks/Rack1D.js';
import Rack2A from '../models/CupboardRacks/Rack2A.js';
import Rack2B from '../models/CupboardRacks/Rack2B.js';
import Rack2C from '../models/CupboardRacks/Rack2C.js';
import Rack2D from '../models/CupboardRacks/Rack2D.js';

// Define your racks with lowercase keys to avoid case sensitivity issues
const racks = {
    'rack1a': Rack1A,
    'rack1b': Rack1B,
    'rack1c': Rack1C,
    'rack1d': Rack1D,
    'rack2a': Rack2A,
    'rack2b': Rack2B,
    'rack2c': Rack2C,
    'rack2d': Rack2D,
    // Add other racks here...
};

// Fetch rack data for a specific rack
export const getRackDataa = async (req, res) => {
    const { rackName } = req.params;
    console.log(`Received request for rack: ${rackName}`);

    // Normalize the rack name to lowercase to handle case-insensitivity
    const RackModel = racks[rackName.toLowerCase()];

    if (!RackModel) {
        // If the rack model doesn't exist, return a 404 error
        return res.status(404).json({ message: `Rack model for '${rackName}' not found` });
    }

    try {
        // Fetch data from the appropriate Rack model (mongoose collection)
        const data = await RackModel.find();
        res.status(200).json(data); // Return the data if found
    } catch (error) {
        console.error(`Error fetching rack data for ${rackName}:`, error.message, { rackName });
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Insert data for a specific rack
export const insertRackDataa = async (req, res) => {
    const { rackName } = req.params;
    console.log(`Received request to insert into rack: ${rackName}`);

    // Normalize the rack name to lowercase to handle case-insensitivity
    const RackModel = racks[rackName.toLowerCase()];

    if (!RackModel) {
        // If the rack model doesn't exist, return a 404 error
        return res.status(404).json({ message: `Rack model for '${rackName}' not found` });
    }

    const { files } = req.body;

    // Validate that files are provided and are in array format
    if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ message: 'Files are required and must be an array' });
    }

    // Validate individual files (check if file has a valid id and name)
    const invalidFiles = files.filter(file => {
        if (typeof file.id !== 'number' || typeof file.name !== 'string' || file.name.trim() === '') {
            return true;
        }
        return false;
    });

    if (invalidFiles.length > 0) {
        // Return a 400 error if any file is invalid
        return res.status(400).json({
            message: 'Each file must have a valid id and name',
            invalidFiles
        });
    }

    const newEntry = new RackModel({ files });

    try {
        // Save the new rack entry into the database
        await newEntry.save();
        res.status(201).json(newEntry); // Return the newly created entry
    } catch (error) {
        console.error(`Error inserting rack data for ${rackName}:`, error.message, { rackName });
        res.status(500).json({ message: 'Internal server error' });
    }
};
