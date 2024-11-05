import  Rack1A  from '../models/CupboardRacks/Rack1A.js'; // Import your models here
import  Rack1B  from '../models/CupboardRacks/Rack1B.js';
import  Rack1C  from '../models/CupboardRacks/Rack1C.js';
import  Rack1D  from '../models/CupboardRacks/Rack1D.js';
import  Rack2A  from '../models/CupboardRacks/Rack2A.js';
import  Rack2B  from '../models/CupboardRacks/Rack2B.js';
import  Rack2C  from '../models/CupboardRacks/Rack2C.js';
import  Rack2D  from '../models/CupboardRacks/Rack2D.js';

const racks = {
    'rack1A': Rack1A,
    'rack1B': Rack1B,
    'rack1C': Rack1C,
    'rack1D': Rack1D,
    'rack2A': Rack2A,
    'rack2B': Rack2B,
    'rack2C': Rack2C,
    'rack2D': Rack2D,

    // Add other racks here...
};

// Fetch rack data for a specific rack
export const getRackDataa = async (req, res) => {
    const { rackName } = req.params;
    console.log(`Received request for rack: ${rackName}`);
    
    const RackModel = racks[rackName];  // Dynamically access the model

    if (!RackModel) {
        return res.status(404).json({ message: `Rack model for '${rackName}' not found` });
    }

    try {
        const data = await RackModel.find();  // Fetch all entries from the collection
        res.status(200).json(data);  // Send the retrieved data as a response
    } catch (error) {
        console.error(`Error fetching rack data for ${rackName}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Insert data for a specific rack
export const insertRackDataa = async (req, res) => {
    const { rackName } = req.params;
    console.log(`Received request to insert into rack: ${rackName}`);
    
    const RackModel = racks[rackName];  // Dynamically access the model

    if (!RackModel) {
        return res.status(404).json({ message: `Rack model for '${rackName}' not found` });
    }

    const { files } = req.body;

    // Basic validation for files
    if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ message: 'Files are required and must be an array' });
    }

    // Validate individual file structure (example)
    const invalidFiles = files.filter(file => !file.id || !file.name);
    if (invalidFiles.length > 0) {
        return res.status(400).json({
            message: 'Each file must have an id and name',
            invalidFiles
        });
    }

    const newEntry = new RackModel({ files });

    try {
        await newEntry.save();
        res.status(201).json(newEntry);  // Send the newly created entry as the response
    } catch (error) {
        console.error(`Error inserting rack data for ${rackName}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
