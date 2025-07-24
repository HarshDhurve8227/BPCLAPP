import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema({
    date: String,
    lorryNo: String,
    transporter: String,
    // models/Checklist.js
    criteria: [
        {
          status: String,
          remarks: String
        }
      ]


  });
  
  const Checklist = mongoose.model('Checklist', checklistSchema);
  
  export default Checklist