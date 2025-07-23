import React, { useState } from 'react';
import './AS06.css' // Assuming the new CSS file for this component is AS06.css

const TankLorryChecklist = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    tankLorryNo: '',
    driverName: '',
    transporter: '',
    checkpoints: [
      { id: 1, name: 'ID Card/Challan Documents', checked: false, observations: '' },
      { id: 2, name: 'Flame /spark arrester', checked: false, observations: '' },
      { id: 3, name: 'Fire Extinguisher', checked: false, observations: '' },
      { id: 4, name: 'Cabin: Below Driver’s seat', checked: false, observations: '' },
      { id: 5, name: 'Lower Cabin', checked: false, observations: '' },
      { id: 6, name: 'Compartment below back seat', checked: false, observations: '' },
      { id: 7, name: 'Master switch/ Battery/Dash board', checked: false, observations: '' },
      { id: 8, name: 'Side and Top compartment', checked: false, observations: '' },
      { id: 9, name: 'Roof from Inside', checked: false, observations: '' },
      { id: 10, name: 'Bonnet inner side and engine area', checked: false, observations: '' },
      { id: 11, name: 'Front and rear bumper inner side', checked: false, observations: '' },
      { id: 12, name: 'Under carriage area', checked: false, observations: '' },
      { id: 13, name: 'Seals –Loose, Broken, Number', checked: false, observations: '' },
      { id: 14, name: 'Extra Diesel Tank compartment', checked: false, observations: '' },
      { id: 15, name: 'Bolting and fixing of Manhole Cover', checked: false, observations: '' },
      { id: 16, name: 'Manhole Seals', checked: false, observations: '' },
      { id: 17, name: 'Leakages', checked: false, observations: '' },
      { id: 18, name: 'Master and all other valves', checked: false, observations: '' },
      { id: 19, name: 'Tyres and spares wheels', checked: false, observations: '' },
      { id: 20, name: 'Body search of Driver & Cleaner', checked: false, observations: '' },
      { id: 21, name: 'Clothes, Match Box, Lighter, Bidi/cigarette', checked: false, observations: '' },
      { id: 22, name: 'Stoves & Utensils', checked: false, observations: '' },
      { id: 23, name: 'Radiator Water', checked: false, observations: '' },
      { id: 24, name: 'Fire Arms/ Weapons/Swords', checked: false, observations: '' },
      { id: 25, name: 'Extra Hidden Material viz. water bucket, iron plate, stones, sand bag, extra jerry can, etc.', checked: false, observations: '' }
    ],
    checkedBy: '',
    supervisor: ''
  });

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckpoints = [...formData.checkpoints];
    updatedCheckpoints[index].checked = !updatedCheckpoints[index].checked;
    setFormData({ ...formData, checkpoints: updatedCheckpoints });
  };

  const handleObservationChange = (e, index) => {
    const updatedCheckpoints = [...formData.checkpoints];
    updatedCheckpoints[index].observations = e.target.value;
    setFormData({ ...formData, checkpoints: updatedCheckpoints });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit the form data to an API or process it here
  };

  return (
    <div className="tank-lorry-checklist-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-heading">TANK LORRY CHECKLIST</h3>
        
        {/* Basic Info */}
        <div className="basic-info">
          <div>
            <label>Date: </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange(e, 'date')}
            />
          </div>
          <div>
            <label>Time: </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange(e, 'time')}
            />
          </div>
          <div>
            <label>Tank Lorry No: </label>
            <input
              type="text"
              value={formData.tankLorryNo}
              onChange={(e) => handleInputChange(e, 'tankLorryNo')}
            />
          </div>
          <div>
            <label>Driver’s Name: </label>
            <input
              type="text"
              value={formData.driverName}
              onChange={(e) => handleInputChange(e, 'driverName')}
            />
          </div>


          <div>
            <label>Transporter: </label>
            <input
              type="text"
              value={formData.transporter}
              onChange={(e) => handleInputChange(e, 'transporter')}  
            />
          </div>
        </div>

      
                                   
        {/* Checkpoints */}
        <table className="checklist-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Check Point</th>
              <th>Checked</th>
              <th>Observations</th>
            </tr>
          </thead>
          <tbody>
            {formData.checkpoints.map((checkpoint, index) => (
              <tr key={checkpoint.id}>
                <td>{checkpoint.id}</td>
                <td>{checkpoint.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={checkpoint.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={checkpoint.observations}
                    onChange={(e) => handleObservationChange(e, index)}
                    placeholder="Enter observations"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Signature Fields */}

        <div className="signatures">
          <div>
            <label>Checked by: </label>
            <input
              type="text"
              value={formData.checkedBy}
              onChange={(e) => handleInputChange(e, 'checkedBy')}
            />
          </div>

          <div>
            <label>Supervisor: </label>
            <input
              type="text"
              value={formData.supervisor}
              onChange={(e) => handleInputChange(e, 'supervisor')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="no-print">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TankLorryChecklist;
