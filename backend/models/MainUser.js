import mongoose from "mongoose";

   const MainuserSchema = new mongoose.Schema({
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       
   });
   const MainUserModel = mongoose.model('MainUser', MainuserSchema);

export default MainUserModel;

