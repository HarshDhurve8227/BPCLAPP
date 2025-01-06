import React, { useState } from 'react';
import './AS16.css'; // Assuming the new CSS file for this component is AS16.css

const HandingOverChecklist = () => {
  const [formData, setFormData] = useState({
    checklistEntries: [
      { id: 1, category: 'A- FIRE PROTECTION SYSTEM', items: [
        { description: 'Level of Fire water tank is satisfactory (4 hrs coverage)', observation: '', remarks: '' },
        { description: 'Fire water system maintained in auto mode with Jockey pump', observation: '', remarks: '' },
        { description: 'Are all fire engines including standby operational and in auto mode', observation: '', remarks: '' },
        { description: 'Are fire alarm & communication system in working condition', observation: '', remarks: '' },
        { description: 'Is Gas Monitoring system operational', observation: '', remarks: '' },
      ]},
      { id: 2, category: 'B- BULK STORAGE AREA', items: [
        { description: 'No visible sign of leak', observation: '', remarks: '' },
        { description: 'Portable fire extinguisher in position', observation: '', remarks: '' },
      ]},
      { id: 3, category: 'C- PUMP HOUSE / COMPRESSOR ROOM', items: [
        { description: 'No visible sign of leak', observation: '', remarks: '' },
        { description: 'Portable fire extinguishers in position', observation: '', remarks: '' },
      ]},
      { id: 4, category: 'D- CYLINDER STORAGE / HANDLING', items: [
        { description: 'Are Cylinders stacked in demarcated area as per norms (filled/empty/defective)', observation: '', remarks: '' },
        { description: 'Are all leaky evacuated cylinders / remaining cylinders properly capped', observation: '', remarks: '' },
        { description: 'No equipment / conveyor motor in running condition', observation: '', remarks: '' },
        { description: 'No visible sign of LPG leakage', observation: '', remarks: '' },
      ]},
      { id: 5, category: 'E- TANK LORRY GANTRY', items: [
        { description: 'No visible sign of leakage', observation: '', remarks: '' },
        { description: 'Portable fire extinguishers in position', observation: '', remarks: '' },
      ]},
      { id: 6, category: 'F- GENERAL', items: [
        { description: 'Whether requisite number of guards available', observation: '', remarks: '' },
        { description: 'Portable fire extinguishers in position in all the area', observation: '', remarks: '' },
        { description: 'All gates in operation area are closed', observation: '', remarks: '' },
        { description: 'CCTV - All Cameras are functional', observation: '', remarks: '' },
        { description: 'Access Control System is functional', observation: '', remarks: '' },
        { description: 'Is Engg, Stores, general stores locked', observation: '', remarks: '' },
        { description: 'Checking fuel level along with topping up of fuel DG set', observation: '', remarks: '' },
        { description: 'Any unauthorized person/vehicles present within plant premises', observation: '', remarks: '' },
        { description: 'Adequate lighting in plant/yard', observation: '', remarks: '' },
        { description: 'Any unsafe condition observed', observation: '', remarks: '' },
        { description: 'Line communication & VHF set is in working condition', observation: '', remarks: '' },
        { description: 'Whether FLP Torches are in working condition', observation: '', remarks: '' },
        { description: 'All TSV isolation valves are in open condition', observation: '', remarks: '' },
        { description: 'Security Wand System is functional and Security patrolling Recorded', observation: '', remarks: '' },
      ]},
      { id: 7, category: 'G- INVENTORY', items: [
        { description: 'Total no of Cylinders - 5kg, 14.2 kg, 19kg, 19kg BMCG, 47.5 kg, 47.5kg LOT, 5kg OMC 14.2 kg, OMC 19 kg', observation: '', remarks: '' },
      ]}
    ],
    dateTime: '',
    handingOver: '',
    takenOver: '',
    officerSignature: '',
    supervisorSignature: ''
  });

  const handleInputChange = (e, categoryIndex, itemIndex, field) => {
    const updatedChecklistEntries = [...formData.checklistEntries];
    updatedChecklistEntries[categoryIndex].items[itemIndex][field] = e.target.value;
    setFormData({ ...formData, checklistEntries: updatedChecklistEntries });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit the form data to an API or process it here
  };

  return (
    <div className="handing-over-checklist-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-heading">HANDING OVER CHECKLIST TO SECURITY</h3>

        {formData.checklistEntries.map((category, categoryIndex) => (
          <div key={category.id}>
            <h4 className="category-heading">{category.category}</h4>
            <table className="checklist-table">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Item Description</th>
                  <th>Observation</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{itemIndex + 1}</td>
                    <td>{item.description}</td>
                    <td>
                      <input
                        type="text"
                        value={item.observation}
                        onChange={(e) => handleInputChange(e, categoryIndex, itemIndex, 'observation')}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.remarks}
                        onChange={(e) => handleInputChange(e, categoryIndex, itemIndex, 'remarks')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Date and Time */}
        <div className="date-time">
          <label>Date & Time: </label>
          <input
            type="datetime-local"
            value={formData.dateTime}
            onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
          />
        </div>

        {/* Handing Over & Taken Over */}
        <div className="handover-takenover">
          <label>Handing Over: </label>
          <input
            type="text"
            value={formData.handingOver}
            onChange={(e) => setFormData({ ...formData, handingOver: e.target.value })}
          />
          <label>Taken Over: </label>
          <input
            type="text"
            value={formData.takenOver}
            onChange={(e) => setFormData({ ...formData, takenOver: e.target.value })}
          />
        </div>

        {/* Signatures */}
        <div className="signatures">
          <label>Designated Officer Signature: </label>
          <input
            type="text"
            value={formData.officerSignature}
            onChange={(e) => setFormData({ ...formData, officerSignature: e.target.value })}
          />
          <label>Security Supervisor Signature: </label>
          <input
            type="text"
            value={formData.supervisorSignature}
            onChange={(e) => setFormData({ ...formData, supervisorSignature: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <div className="no-print">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default HandingOverChecklist;
