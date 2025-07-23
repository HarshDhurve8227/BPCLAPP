import React, { useState } from 'react';
import './AS09.css'; // Assuming the new CSS file for this component is AS09.css

const PackedLorryInOutRegister = () => {
  const [formData, setFormData] = useState({
    entries: [
      {
        id: 1,
        dateIn: '',
        vehicleNo: '',
        transporter: '',
        exDistributorLocation: '',
        ervNo: '',
        cylinders5In: '',
        cylinders14In: '',
        cylinders19In: '',
        cylinders35In: '',
        cylinders48In: '',
        securitySignatureIn: '',
        toDistributorLocation: '',
        invoiceNo: '',
        cylinders5Out: '',
        cylinders14Out: '',
        cylinders19Out: '',
        cylinders35Out: '',
        cylinders48Out: '',
        dateOut: '',
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
    <div className="packed-lorry-register-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-heading">PACKED LORRY IN / OUT REGISTER</h3>

        {/* Page 1 Table - Inbound Data */}
        <h4>Page 1: Inbound Data</h4>
        <table className="register-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Date In</th>
              <th>Vehicle No</th>
              <th>Transporter</th>
              <th>Ex Distributor / Location</th>
              <th>ERV No</th>
              <th>5 Cylinders</th>
              <th>14 Cylinders</th>
              <th>19 Cylinders</th>
              <th>35 Cylinders</th>
              <th>48 Cylinders</th>
              <th>Security Signature</th>
            </tr>
          </thead>
          <tbody>
            {formData.entries.map((entry, index) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>
                  <input
                    type="date"
                    value={entry.dateIn}
                    onChange={(e) => handleInputChange(e, 'dateIn', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.vehicleNo}
                    onChange={(e) => handleInputChange(e, 'vehicleNo', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.transporter}
                    onChange={(e) => handleInputChange(e, 'transporter', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.exDistributorLocation}
                    onChange={(e) => handleInputChange(e, 'exDistributorLocation', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.ervNo}
                    onChange={(e) => handleInputChange(e, 'ervNo', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.cylinders5In}
                    onChange={(e) => handleInputChange(e, 'cylinders5In', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.cylinders14In}
                    onChange={(e) => handleInputChange(e, 'cylinders14In', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.cylinders19In}
                    onChange={(e) => handleInputChange(e, 'cylinders19In', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.cylinders35In}
                    onChange={(e) => handleInputChange(e, 'cylinders35In', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.cylinders48In}
                    onChange={(e) => handleInputChange(e, 'cylinders48In', index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.securitySignatureIn}
                    onChange={(e) => handleInputChange(e, 'securitySignatureIn', index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Page 2 Table - Outbound Data */}
        <h4>Page 2: Outbound Data</h4>
        <table className="register-table">
          <thead>
            <tr>
              <th>To Distributor / Location</th>
              <th>Invoice No</th>
              <th>5 Cylinders</th>
              <th>14 Cylinders</th>
              <th>19 Cylinders</th>
              <th>35 Cylinders</th>
              <th>48 Cylinders</th>
              <th>Date Out</th>
              <th>Security Signature</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {formData.entries.map((entry, index) => (
              <tr key={entry.id}>
                <td>
                  <input
                    type="text"
                    value={entry.toDistributorLocation}
                    onChange={(e) => handleInputChange(e, 'toDistributorLocation', index)}
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
                    type="number"
                    value={entry.cylinders5Out}
                    onChange={(e) => handleInputChange(e, 'cylinders5Out', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.cylinders14Out}
                    onChange={(e) => handleInputChange(e, 'cylinders14Out', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.cylinders19Out}
                    onChange={(e) => handleInputChange(e, 'cylinders19Out', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.cylinders35Out}
                    onChange={(e) => handleInputChange(e, 'cylinders35Out', index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.cylinders48Out}
                    onChange={(e) => handleInputChange(e, 'cylinders48Out', index)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={entry.dateOut}
                    onChange={(e) => handleInputChange(e, 'dateOut', index)}
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

export default PackedLorryInOutRegister;
