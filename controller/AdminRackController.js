// Fetch data for specific rack
export const getRackDataa = async (req, res) => {
    const { rackName } = req.params;
    console.log('Received request for rack:', rackName); // Log the requested rack name
    const RackModel = racks[rackName];

    if (!RackModel) {
        return res.status(404).json({ message: 'Rack model not found' });
    }

    try {
        const data = await RackModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching rack data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Insert data for specific rack
export const insertRackDataa = async (req, res) => {
    const { rackName } = req.params;
    console.log('Received request to insert into rack:', rackName); // Log the rack for insertion
    const RackModel = racks[rackName];

    if (!RackModel) {
        return res.status(404).json({ message: 'Rack model not found' });
    }

    const { files } = req.body;
    const newEntry = new RackModel({ files });

    try {
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error inserting rack data:', error);
        res.status(400).json({ message: 'Bad request' });
    }
};
