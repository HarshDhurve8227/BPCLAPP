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
    let { rackName } = req.params;

    // Log the raw rack name received from the request
    console.log(`Received request for rack: '${rackName}'`);

    // Trim any extra spaces or newline characters from rackName
    rackName = rackName.trim();

    // Ensure the rack name matches the exact case (no need to modify, just trim it)
    const RackModel = racks[rackName];

    if (!RackModel) {
        // If the rack model doesn't exist, return a 404 error
        return res.status(404).json({ message: `Rack model for '${rackName}' not found` });
    }

    try {
        // Fetch data from the appropriate Rack model (mongoose collection)
        const data = await RackModel.find();

        // Modify the data to exclude _id and __v fields
        const modifiedData = data.map(item => {
            const { _id, __v, ...rest } = item.toObject(); // Convert to plain object and exclude unwanted fields
            return rest;
        });

        res.status(200).json(modifiedData); // Return the modified data
    } catch (error) {
        console.error(`Error fetching rack data for ${rackName}:`, error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRackDataaByyId = async (req, res) => {
    let { rackName, _id } = req.params;

    // Log the raw rack name and file ID received from the request
    console.log(`Received request for rack: '${rackName}' and fileId: '${_id}'`);

    // Trim any extra spaces or newline characters from rackName
    rackName = rackName.trim();

    // Ensure the rack name matches the exact case (no need to modify, just trim it)
    const RackModel = racks[rackName];

    if (!RackModel) {
        // If the rack model doesn't exist, return a 404 error
        return res.status(404).json({ message: `Rack model for '${rackName}' not found` });
    }

    try {
        // Fetch data from the appropriate Rack model (mongoose collection)
        const data = await RackModel.find();

        // Modify the data to exclude _id and __v fields for all racks
        const modifiedData = data.map(item => {
            const { _id, __v, ...rest } = item.toObject(); // Exclude _id and __v fields
            return rest;
        });

        // Now, find the specific file using _id from the files array
        const rackData = modifiedData.find(rack =>
            rack.files && rack.files.some(file => file._id.toString() === _id)
        );

        if (!rackData) {
            return res.status(404).json({ message: `File with ID '${_id}' not found in rack '${rackName}'` });
        }

        // Find the file that matches the given _id
        const file = rackData.files.find(file => file._id.toString() === _id);

        if (!file) {
            return res.status(404).json({ message: `File with ID '${_id}' not found` });
        }

        // Return the found file
        res.status(200).json(file);
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
    const { rackName, _id } = req.params;  // _id is passed in the URL
    const { name } = req.body;  // File name to update

    // Log the raw request
    console.log(`Received request to update file in rack: '${rackName}', fileId: '${_id}'`);

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

    try {
        // Find the rack and look for the file by its _id
        const rack = await RackModel.findOne({ "files._id": _id });

        if (!rack) {
            return res.status(404).json({ message: `File with _id '${_id}' not found in rack '${rackName}'` });
        }

        // Find the file to update within the files array
        const file = rack.files.find(file => file._id.toString() === _id);

        if (!file) {
            return res.status(404).json({ message: `File with _id '${_id}' not found` });
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


export const deleterackdataa = async (req, res) => {
    const { rackName, fileId } = req.params;

    console.log('Received Rack Name:', rackName); // Log rackName
    console.log('Received File ID:', fileId);     // Log fileId

    // Convert fileId to a number if needed (or keep it as a string depending on your actual data type)
    const fileIdNumber = parseInt(fileId, 10);
    console.log(`Parsed File ID: ${fileIdNumber}`); // Log parsed fileId

    try {
        // Check if the rack exists in the racks object
        const RackModel = racks[rackName];  // Dynamically get the correct rack model
        if (!RackModel) {
            console.log(`Rack not found: ${rackName}`);
            return res.status(404).json({ message: `Rack '${rackName}' not found` });
        }

        // Fetch the rack data just like in the getRackDataa controller
        const rack = await RackModel.findOne(); // We don't need to search by name here
        if (!rack) {
            console.log(`Rack not found in the database: ${rackName}`);
            return res.status(404).json({ message: `Rack '${rackName}' not found in database` });
        }

        // Find the file in the rack using the fileId
        const fileIndex = rack.files.findIndex(file => file.id === fileIdNumber);
        console.log(`Index of the file to be deleted: ${fileIndex}`);

        if (fileIndex === -1) {
            console.log(`File with ID ${fileIdNumber} not found in the rack`);
            return res.status(404).json({ message: 'File not found in this rack' });
        }

        // Remove the file from the rack
        console.log(`File found with ID: ${fileIdNumber}, Deleting...`);
        rack.files.splice(fileIndex, 1); // Remove the file from the array
        await rack.save();  // Save the updated rack data to the database

        console.log('File successfully deleted');
        res.status(200).json({ message: 'File deleted successfully from rack' });
    } catch (error) {
        console.error('Error deleting file from rack:', error); // Log any errors
        res.status(500).json({ message: 'Error deleting file from rack', error: error.message });
    }
};
