import express from 'express';
import { UpdateUser } from '../controller/UserController'; // Adjust path as necessary

const router = express.Router();

// Route to update a product
router.put('/update/:id', UpdateUser);

export default router;
