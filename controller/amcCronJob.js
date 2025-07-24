// amcCronJob.js
import Equipment from '../models/AMC.js';
import { sendWhatsAppToManager } from './twilioClient.js';


const managerNumbers = ['+919876543210', '+918765432109']; // Change to real numbers

export const checkExpiredAMCsAndNotify = async () => {
  const today = new Date();
  const expiredAMCs = await Equipment.find({
    nextDueDate: { $lt: today }
  });

  for (const item of expiredAMCs) {
    for (const number of managerNumbers) {
      await sendWhatsAppToManager(number, item.equipment, item.nextDueDate.toDateString());
    }
  }

  console.log(`✅ ${expiredAMCs.length} expired AMCs checked.`);
};

 checkExpiredAMCsAndNotify(); //  call directly just for testing!

