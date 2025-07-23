import React, { useState } from 'react';
import './AS17.css'; // Assuming the new CSS file for this component is AS17.css

const SecurityGuardPatrolling = () => {
  const [formData, setFormData] = useState({
    date: '',
    patrolEntries: [
      { id: 1, time: '', area: '', observation: '' },
      { id: 2, time: '', area: '', observation: '' },
      { id: 3, time: '', area: '', observation: '' },
      { id: 4, time: '', area: '', observation: '' },
      { id: 5, time: '', area: '', observation: '' },
      { id: 6, time: '', area: '', observation: '' },
      { id: 7, time: '', area: '', observation: '' },
    ],
    officerSignature: '',
  });

  const handleInputChange = (e, index, field) => {
    const updatedEntries = [...formData.patrolEntries];
    updatedEntries[index][field] = e.target.value;
    setFormData({ ...formData, patrolEntries: updatedEntries });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit the form data to an API or process it here
  };

  return (
    <div className="security-guard-patrolling-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-heading">SECURITY GUARD PATROLLING RECORD</h3>

        {/* Date input */}
        <div className="date">
          <label>Date: </label>
          <input
            type="date"
            value={formData.date}
            onChange={handleDateChange}
          />
        </div>

        {/* Patrolling Table */}
        <table className="patrolling-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Time</th>
              <th>Area/Checkpoint</th>
              <th>Observation</th>
            </tr>
          </thead>
          <tbody>
            {formData.patrolEntries.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="time"
                    value={entry.time}
                    onChange={(e) => handleInputChange(e, index, 'time')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.area}
                    onChange={(e) => handleInputChange(e, index, 'area')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.observation}
                    onChange={(e) => handleInputChange(e, index, 'observation')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Signature */}
        <div className="signature">
          <label>Officer's Signature: </label>
          <input
            type="text"
            value={formData.officerSignature}
            onChange={(e) => setFormData({ ...formData, officerSignature: e.target.value })}
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

export default SecurityGuardPatrolling;








