import Rack1A from '../models/CupboardRacks/Rack1A.js';
import Rack1B from '../models/CupboardRacks/Rack1B.js';
import Rack1C from '../models/CupboardRacks/Rack1C.js';
import Rack1D from '../models/CupboardRacks/Rack1D.js';
import Rack2A from '../models/CupboardRacks/Rack2A.js';
import Rack2B from '../models/CupboardRacks/Rack2B.js';
import Rack2C from '../models/CupboardRacks/Rack2C.js';
import Rack2D from '../models/CupboardRacks/Rack2D.js';

// Define your racks with exact casing to match collection names
const racks = {
    'Rack1A': Rack1A,
    'Rack1B': Rack1B,
    'Rack1C': Rack1C,
    'Rack1D': Rack1D,
    'Rack2A': Rack2A,
    'Rack2B': Rack2B,
    'Rack2C': Rack2C,
    'Rack2D': Rack2D,
    // Add other racks here...
};

// Fetch rack data for a specific rack
export const getRackDataa = async (req, res) => {
    const { rackName, fileId } = req.params;

    // Log the raw rack name and fileId received from the request
    console.log(`Received request for rack: '${rackName}', fileId: '${fileId}'`);

    // Trim any extra spaces or newline characters from rackName and fileId
    rackName = rackName.trim();
    fileId = fileId.trim();

    // Ensure the rack name matches the exact case (no need to modify, just trim it)
    const RackModel = racks[rackName];

    if (!RackModel) {
        // If the rack model doesn't exist, return a 404 error
        return res.status(404).json({ message: `Rack model for '${rackName}' not found` });
    }

    try {
        // Fetch the rack data from the appropriate Rack model (mongoose collection)
        const data = await RackModel.find();

        // Check if data was found
        if (!data || data.length === 0) {
            return res.status(404).json({ message: `No data found for rack: ${rackName}` });
        }

        // Find the file inside the rack that matches the fileId
        const rack = data[0]; // Assuming `data` is an array and you want the first item
        const file = rack.files.find(file => file.id === parseInt(fileId));  // Matching by file.id

        if (!file) {
            // If the file is not found, return a 404 error
            return res.status(404).json({ message: `File with id '${fileId}' not found in rack '${rackName}'` });
        }

        // Exclude _id and __v from the file object
        const { _id, __v, ...fileData } = file.toObject();

        // Return the found file data
        res.status(200).json(fileData);
    } catch (error) {
        console.error(`Error fetching rack data for ${rackName}:`, error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Insert data for a specific rack
export const insertRackDataa = async (req, res) => {
    let { rackName } = req.params;

    // Log the raw rack name received from the request
    console.log(`Received request to insert into rack: '${rackName}'`);

    // Trim any extra spaces or newline characters from rackName
    rackName = rackName.trim();

    // Ensure the rack name matches the exact case (no need to modify)
    const RackModel = racks[rackName];

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
        console.error(`Error inserting rack data for ${rackName}:`, error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateRackDataa = async (req, res) => {
    const { rackName, fileId } = req.params;
    const { name } = req.body;  // File name to update

    // Log the raw request
    console.log(`Received request to update file in rack: '${rackName}', fileId: '${fileId}'`);

    // Trim any extra spaces or newline characters from rackName
    rackName = rackName.trim();

    // Ensure the rack name matches the exact case (no need to modify, just trim it)
    const RackModel = racks[rackName];

    if (!RackModel) {
        // If the rack model doesn't exist, return a 404 error
        return res.status(404).json({ message: `Rack model for '${rackName}' not found` });
    }

    // Validate that the name is not empty and is a string
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'File name is required and must be a non-empty string' });
    }

    // Validate that the fileId is a number (check for type coercion issues)
    const parsedFileId = parseInt(fileId);
    if (isNaN(parsedFileId)) {
        return res.status(400).json({ message: `Invalid fileId: '${fileId}'` });
    }

    try {
        // Find the specific rack by name and check for file in the files array using fileId
        const rack = await RackModel.findOne({ "files.id": parsedFileId });

        if (!rack) {
            return res.status(404).json({ message: `File with ID '${fileId}' not found in rack '${rackName}'` });
        }

        // Find the file to update within the files array
        const file = rack.files.find(file => file.id === parsedFileId);

        if (!file) {
            return res.status(404).json({ message: `File with ID '${fileId}' not found` });
        }

        // Update the file name
        file.name = name.trim();

        // Save the updated rack
        await rack.save();

        // Return the updated file as part of the response
        res.status(200).json({ message: 'File updated successfully', file: file });

    } catch (error) {
        console.error(`Error updating file in ${rackName}:`, error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
