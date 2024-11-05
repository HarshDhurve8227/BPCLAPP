// Fetch rack data for a specific rack
export const getRackData = async (req, res) => {
    const { rackName } = req.params;
    console.log(`Received request for rack: ${rackName}`); // Log the requested rack name
    
    const RackModel = racks[rackName];  // Dynamically access the model from racks

    if (!RackModel) {
        return res.status(404).json({ message: 'Rack model not found' });
    }

    try {
        const data = await RackModel.find();  // Retrieve all data from the model
        res.status(200).json(data);  // Send back the data
    } catch (error) {
        console.error(`Error fetching rack data for ${rackName}:`, error);  // Log error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Insert data for a specific rack
export const insertRackData = async (req, res) => {
    const { rackName } = req.params;
    console.log(`Received request to insert into rack: ${rackName}`);  // Log the rack for insertion
    
    const RackModel = racks[rackName];  // Dynamically access the model from racks

    if (!RackModel) {
        return res.status(404).json({ message: 'Rack model not found' });
    }

    const { files } = req.body;  // Expecting `files` from the request body
    
    // Validation for files
    if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ message: 'Files are required and must be an array' });
    }

    // Validate each file if needed (example, check for file type or size)
    // Example: Ensure the files have a correct structure or content
    // You can expand this section based on the file validation needed

    const newEntry = new RackModel({ files });

    try {
        await newEntry.save();  // Save the new entry to the model
        res.status(201).json(newEntry);  // Send back the saved entry as a response
    } catch (error) {
        console.error(`Error inserting rack data into ${rackName}:`, error);  // Log error for debugging
        res.status(400).json({ message: 'Bad request' });
    }
};
