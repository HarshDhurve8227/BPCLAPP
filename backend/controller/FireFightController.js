import FireFightUserModel from "../models/FireFight.js";

const CreateUser = async (req, res) => {
    try {
        const { srno, Assets, ComponentsAndEquipments, AvailableStock, MinStock, LeadTime, ExcessShortFall, StatusofOrder } = req.body;

        if (!srno || !Assets || !ComponentsAndEquipments) {
            return res.status(400).json({ success: false, Message: 'Missing required fields' });
        }

        const NewUser = new FireFightUserModel({
            srno,
            Assets,
            ComponentsAndEquipments,
            AvailableStock,
            MinStock,
            LeadTime,
            ExcessShortFall,
            StatusofOrder
        });

        await NewUser.save();
        res.status(201).json({ success: true, Message: 'User created successfully', NewUser });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ success: false, Message: 'Internal server error', error: error.message });
    }
};

const GetUser = async (req, res) => {
    try {
        const user = await FireFightUserModel.find();
        if (user.length === 0) {
            return res.status(404).json({ success: false, Message: 'No users found' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ success: false, Message: 'Internal server error', error: error.message });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const UserId = req.params.id;
        const UpdatedUser = await FireFightUserModel.findByIdAndUpdate(UserId, req.body, { new: true });

        if (!UpdatedUser) {
            return res.status(404).json({ success: false, Message: 'User not found' });
        }
        res.status(200).json({ success: true, Message: 'User updated successfully', UpdatedUser });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ success: false, Message: 'Internal server error', error: error.message });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const UserId = req.params.id;
        const deletedUser = await FireFightUserModel.findByIdAndDelete(UserId);

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
    const { id } = req.params;
    try {
        const product = await FireFightUserModel.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Controller to get product details for update
 const getProductForUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await FireFightUserModel.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


export { CreateUser, GetUser, UpdateUser, DeleteUser ,getProductById , getProductForUpdate};
