import React, { useState } from 'react';
import './AS12.css'; // Assuming the new CSS file for this component is AS12.css

const MaterialInRegister = () => {
  const [formData, setFormData] = useState({
    entries: [
      {
        id: 1,
        date: '',
        challanNo: '',
        nameOfParty: '',
        descriptionOfGoods: '',
        quantity: '',
        securitySignature: '',
        remarks: '',
      },
    ],
    officerSignature: '',
  });

  const handleInputChange = (e, field, index) => {
    const updatedEntries = [...formData.entries];
    updatedEntries[index][field] = e.target.value;
    setFormData({ ...formData, entries: updatedEntries });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit the form data to an API or process it here
  };

  return (
    <div className="material-in-register-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-heading">MATERIAL IN REGISTER</h3>

        <table className="register-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Date</th>
              <th>M.R./Challan No.</th>
              <th>Name of Party</th>
              <th>Description of Goods</th>
              <th>Quantity</th>
              <th>Security Supervisor/Guard Signature</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {formData.entries.map((entry, index) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) => handleInputChange(e, 'date', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.challanNo}
                    onChange={(e) => handleInputChange(e, 'challanNo', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.nameOfParty}
                    onChange={(e) => handleInputChange(e, 'nameOfParty', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.descriptionOfGoods}
                    onChange={(e) => handleInputChange(e, 'descriptionOfGoods', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.quantity}
                    onChange={(e) => handleInputChange(e, 'quantity', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.securitySignature}
                    onChange={(e) => handleInputChange(e, 'securitySignature', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.remarks}
                    onChange={(e) => handleInputChange(e, 'remarks', index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Officer Signature */}
        <div className="officer-signature">
          <label>Signature of Officer: </label>
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

export default MaterialInRegister;
