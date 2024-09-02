import express from 'express';
import { register,login } from '../controller/mainUserController.js';

import { authenticate } from '../middleware/authenticate.js';
import MainUserModel from '../models/MainUser.js';


const authrouter = express.Router();



authrouter.post('/register',  register);


authrouter.post('/login', login);


authrouter.get('/Mainuser', authenticate, async (req, res) => {
    try {
        const user = await MainUserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default authrouter;
