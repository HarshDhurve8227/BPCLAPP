import React, { useState } from 'react';
import './AS08.css'; // Assuming the new CSS file for this component is AS08.css

const TankLorryInOutRegister = () => {
  const [formData, setFormData] = useState({
    entries: [
      {
        id: 1,
        date: '',
        lorryNo: '',
        location: '',
        invoiceNo: '',
        invoiceDate: '',
        invoiceQty: '',
        timeIn: '',
        securitySignatureIn: '',
        timeOut: '',
        securitySignatureOut: '',
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
    <div className="tank-lorry-register-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-heading">TANK LORRY IN/OUT REGISTER</h3>

        {/* Table of Entries */}
        <table className="register-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Date</th>
              <th>Lorry No</th>
              <th>Location</th>
              <th>Invoice No</th>
              <th>Invoice Date</th>
              <th>Invoice Qty</th>
              <th>Time In</th>
              <th>Security Signature In</th>
              <th>Time Out</th>
              <th>Security Signature Out</th>
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
                    value={entry.lorryNo}
                    onChange={(e) => handleInputChange(e, 'lorryNo', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.location}
                    onChange={(e) => handleInputChange(e, 'location', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.invoiceNo}
                    onChange={(e) => handleInputChange(e, 'invoiceNo', index)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={entry.invoiceDate}
                    onChange={(e) => handleInputChange(e, 'invoiceDate', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.invoiceQty}
                    onChange={(e) => handleInputChange(e, 'invoiceQty', index)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={entry.timeIn}
                    onChange={(e) => handleInputChange(e, 'timeIn', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.securitySignatureIn}
                    onChange={(e) => handleInputChange(e, 'securitySignatureIn', index)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={entry.timeOut}
                    onChange={(e) => handleInputChange(e, 'timeOut', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.securitySignatureOut}
                    onChange={(e) => handleInputChange(e, 'securitySignatureOut', index)}
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
          <label>Signature of Officer In Charge: </label>
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

export default TankLorryInOutRegister;
