import React, { useState } from 'react';
import './AS15.css'; // Assuming the new CSS file for this component is AS15.css

const ReturnableMaterialRegister = () => {
  const [formData, setFormData] = useState({
    entries: [
      {
        id: 1,
        date: '',
        gatePassNo: '',
        descriptionOfItems: '',
        quantity: '',
        issuedTo: '',
        expectedDateOfReturn: '',
        signOfReceiver: '',
        securitySignature: '',
        dateOfReturn: '',
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
    <div className="returnable-material-register-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-heading">RETURNABLE MATERIAL REGISTER</h3>

        <table className="register-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Date</th>
              <th>Gate Pass No.</th>
              <th>Description of Items</th>
              <th>Quantity</th>
              <th>Issued To</th>
              <th>Expected Date of Return</th>
              <th>Sign of Receiver</th>
              <th>Security Supervisor/Guard Signature</th>
              <th>Date of Return of Material</th>
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
                    value={entry.gatePassNo}
                    onChange={(e) => handleInputChange(e, 'gatePassNo', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.descriptionOfItems}
                    onChange={(e) => handleInputChange(e, 'descriptionOfItems', index)}
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
                    value={entry.issuedTo}
                    onChange={(e) => handleInputChange(e, 'issuedTo', index)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={entry.expectedDateOfReturn}
                    onChange={(e) => handleInputChange(e, 'expectedDateOfReturn', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.signOfReceiver}
                    onChange={(e) => handleInputChange(e, 'signOfReceiver', index)}
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
                    type="date"
                    value={entry.dateOfReturn}
                    onChange={(e) => handleInputChange(e, 'dateOfReturn', index)}
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

export default ReturnableMaterialRegister;
