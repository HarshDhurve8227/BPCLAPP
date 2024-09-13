import React, { useState } from 'react';
import axios from 'axios';
import './checklistform.css';

const criteriaList = [
  // Criteria list as before
  "The Exhaust from the engine is under the driver's cabin and fitted with a suitable spark arrestor.",
  "Condition of flooring (i.e., wooden planks, rubber matting) in the lorry for properly stacking of the cylinders in 6 x 3 of 16 to 18 lines is good. Condition of wooden patti/rafter on both sides is good and without any sharp projections.",
  "The lorry carries 1 no. of 10 Kg. DCP Fire Extinguisher in easily accessible position, with number.",
  "Internals of Fire Extinguisher are in good condition.",
  "RTO permits, Crew having valid HVD licence endorsed from RTO for carrying explosive goods.",
  "HAZCHEM sign with address and Telephone nos. displayed prominently.",
  "Fuel tanks are protected by means of stout guard and Fuel tank cap is locked.",
  "Readily accessible master switch, for switching off the current supply is provided inside the cabin.",
  "Electrical wiring should be properly insulated and provided with suitable over current protection (Proper tube fuses), No loose Electrical wiring/terminals.",
  "Whether flammable/objectionable material found in the vehicle.",
  "Lorry is self-starting.",
  "Whether all stacks are visible from both the sides.",
  "Carries TREMCARD, instructions booklet detailing instructions on handling emergencies en route.",
  "Lorry is to be painted externally as per company colour code and Logo. (VM)",
  "Weather seat belt provided and is it in working condition",
];

const ChecklistForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    lorryNo: '',
    transporter: '',
    criteria: criteriaList.map(() => ({ status: '', remarks: '' })),
    driverSignature: '',
    prepareByOperator: '',
    officerSignature: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCriteriaChange = (index, e) => {
    const { name, value } = e.target;
    const newCriteria = [...formData.criteria];
    newCriteria[index] = { ...newCriteria[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      criteria: newCriteria,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/checklist', formData);
      alert('Form saved successfully!');
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="checklist-form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-heading">FORMAT NO. AS 11</h2>
        <h3 className="form-subheading">CHECK LIST FOR PACKED LORRIES</h3>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Box Lorry No.:</label>
          <input
            type="text"
            name="lorryNo"
            value={formData.lorryNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Transporter:</label>
          <input
            type="text"
            name="transporter"
            value={formData.transporter}
            onChange={handleChange}
            required
          />
        </div>

        <table className="criteria-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Criterions</th>
              <th>Status Yes / No</th>
              <th>Remarks, if any</th>
            </tr>
          </thead>
          <tbody>
            {criteriaList.map((criterion, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{criterion}</td>
                <td>
                  <select
                    name="status"
                    value={formData.criteria[index].status}
                    onChange={(e) => handleCriteriaChange(index, e)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td>
                  <textarea
                    name="remarks"
                    value={formData.criteria[index].remarks}
                    onChange={(e) => handleCriteriaChange(index, e)}
                    rows="3" // Adjust this if needed
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-group">
          <label>Driver’s Signature:</label>
          <input
            type="text"
            name="driverSignature"
            value={formData.driverSignature}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Prepared By Operator:</label>
          <input
            type="text"
            name="prepareByOperator"
            value={formData.prepareByOperator}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Officer’s Signature:</label>
          <input
            type="text"
            name="officerSignature"
            value={formData.officerSignature}
            onChange={handleChange}
          />
        </div>

        <div className="form-group no-print">
          <button type="submit">Save</button>
          <button type="button" onClick={handlePrint}>Print</button>
        </div>
      </form>
    </div>
  );
};

export default ChecklistForm;
