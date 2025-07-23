// controller/notifyController.js
import Equipment from '../models/AMC.js';
import { sendWhatsAppToManager } from './twilioClient.js';


const managerNumbers = ['91', '91xxxxxxxxxx']; // Add real numbers

export const notifyOverdueAMCs = async (req, res) => {
  try {
    const equipments = await Equipment.find();
    const today = new Date();

    const overdueEquipments = equipments.filter(e => {
      const dueDate = new Date(e.nextDueDate);
      return dueDate < today && !isNaN(dueDate.getTime());
    });

    for (const item of overdueEquipments) {
      const formattedDate = new Date(item.nextDueDate).toLocaleDateString('en-GB');
      const message = `⚠️ AMC expired: ${item.equipment} (Due: ${formattedDate})`;

      for (const number of managerNumbers) {
        await sendWhatsAppMessage(number, message);
      }
    }

    res.status(200).json({ success: true, message: "WhatsApp messages sent.", count: overdueEquipments.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
