
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'; // Import toast and Toaster
import '../Product.css';

export default function AMCInsert() {
  const { rackNumber } = useParams();
  const [formData, setFormData] = useState({
    equipment: '',
    company: '',
    validity: { from: '', to: '' },
    pms: '',
    vendorCode: '',
    contractNumber: '',
    concernedPerson: '',
    mobileNumber: '',
    lastDateOfChecking: '',
    nextDueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'from' || name === 'to') {
      setFormData((prev) => ({
        ...prev,
        validity: { ...prev.validity, [name]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/equipment/add}`, formData);
      toast.success('Equipment added successfully!'); // Success toast
      // Reset the form
      setFormData({
        equipment: '',
        company: '',
        validity: { from: '', to: '' },
        pms: '',
        vendorCode: '',
        contractNumber: '',
        concernedPerson: '',
        mobileNumber: '',
        lastDateOfChecking: '',
        nextDueDate: '',
      });
    } catch (error) {
      toast.error('Failed to add equipment: ' + (error.response?.data?.message || error.message)); // Error toast
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100vh',
      backgroundColor: '#f9f9f9',
      paddingTop: '50px'
    }}>
      <Toaster /> {/* Place the Toaster component here */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '500px',
        marginTop: '50px'
      }}>
        <h3 className="text-primary">Insert Equipment Information</h3>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label className="custom-table-head">
              Equipment:
              <input type="text" name="equipment" value={formData.equipment} placeholder="Equipment" onChange={handleChange} required />
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              Company:
              <input type="text" name="company" value={formData.company} placeholder="Company" onChange={handleChange} required />
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              Validity From:
              <input type="date" name="from" value={formData.validity.from} onChange={handleChange} required />
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              Validity To:
              <input type="date" name="to" value={formData.validity.to} onChange={handleChange} required />
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              PMS:
              <select name="pms" value={formData.pms} onChange={handleChange} required>
                <option value="">Select PMS</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              Vendor Code:
              <input type="text" name="vendorCode" value={formData.vendorCode} placeholder="Vendor Code" onChange={handleChange} />
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              Contract Number:
              <input type="text" name="contractNumber" value={formData.contractNumber} placeholder="Contract Number" onChange={handleChange} />
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              Concerned Person:
              <input type="text" name="concernedPerson" value={formData.concernedPerson} placeholder="Concerned Person" onChange={handleChange} />
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              Mobile Number:
              <input type="text" name="mobileNumber" value={formData.mobileNumber} placeholder="Mobile Number" onChange={handleChange} />
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              Last Date of Checking:
              <input type="date" name="lastDateOfChecking" value={formData.lastDateOfChecking} onChange={handleChange} />
            </label>
          </div>
          <br />
          <div>
            <label className="custom-table-head">
              Next Due Date:
              <input type="date" name="nextDueDate" value={formData.nextDueDate} onChange={handleChange} />
            </label>
          </div>
          <br />
          <button className="custom-table-head btn btn-outline-success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
