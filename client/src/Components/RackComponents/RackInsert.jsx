// InsertForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import '../Product.css';

export default function RackInsert() {
  const { rackNumber } = useParams(); // Get rackNumber from route parameters
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    section: '',
    materialName: '',
    availableStock: '',
    issue: '',
    receit: 0, // Set default value for receit to 0
    closingStock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue;

    // Convert value to number only for numeric fields
    if (name === 'section' || name === 'availableStock' || name === 'issue' || name === 'receit') {
      newValue = value === '' ? '' : Number(value);
    } else {
      newValue = value; // Keep materialName as a string
    }

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: newValue };

      // Calculate closing stock whenever relevant fields change
      if (updatedData.availableStock !== '' && updatedData.issue !== '' && updatedData.receit !== '') {
        updatedData.closingStock = updatedData.availableStock - (updatedData.issue + updatedData.receit);
      } else {
        updatedData.closingStock = ''; // Reset if fields are empty
      }
      
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/rack/${rackNumber}`, formData);
      console.log('Data inserted:', response.data);
      
      // Navigate to the new route
      navigate(`/insertproducts/${rackNumber}`);
      
      // Reset the form or handle success state
      setFormData({
        section: '',
        materialName: '',
        availableStock: '',
        issue: '',
        receit: 0, // Reset receit to 0 on form reset
        closingStock: '',
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full height of the viewport
      backgroundColor: '#f9f9f9', // Optional: background color
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '500px', // Adjusted width to 500px
      }}>
        <h3 className='text-primary'>Insert Rack Data</h3>
        <br />
        <div>
          <label className='custom-table-head'>Section     :     </label>
          <input type="text" name="section" value={formData.section} onChange={handleChange} required />
        </div>
        <br />

        <div>
          <label className='custom-table-head'>Material Name:</label>
          <input type="text" name="materialName" value={formData.materialName} onChange={handleChange} required />
        </div>
        <br />

        <div>
          <label className='custom-table-head'>Available Stock:</label>
          <input type="number" name="availableStock" value={formData.availableStock} onChange={handleChange} required />
        </div>
        <br />

        <div>
          <label className='custom-table-head'>Issue     :     </label>
          <input type="number" name="issue" value={formData.issue} onChange={handleChange} />
        </div>
        <br />

        <div>
          <label className='custom-table-head'>Receit     :</label>
          <input type="number" name="receit" value={formData.receit} onChange={handleChange} />
        </div>
        <br />

        <div>
          <label className='custom-table-head'>Closing Stock:</label>
          <input type="number" name="closingStock" value={formData.closingStock} readOnly required />
        </div>
        <br />

        <button type="submit" className='custom-table-head btn btn-outline-success'>Submit</button>
      </form>
    </div>
  );
}
