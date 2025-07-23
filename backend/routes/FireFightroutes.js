import express from 'express';
import { CreateUser, GetUser, UpdateUser, DeleteUser, getProductById, getProductForUpdate } from '../controller/FireFightController.js';

const routers = express.Router();

routers.post('/create', CreateUser);
routers.get('/product', GetUser);
routers.put('/update/:id', UpdateUser);
routers.delete('/delete/:id', DeleteUser);
routers.get('/product/:id', getProductById);  // Corrected route

export default routers;