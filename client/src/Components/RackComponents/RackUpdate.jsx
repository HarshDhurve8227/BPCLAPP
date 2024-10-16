import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'; // Importing toast and Toaster

export default function RackUpdate() {
  const { rackNumber, _id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    section: '',
    materialName: '',
    availableStock: '',
    issue: '',
    receit: '',
    closingStock: '',
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/rack/${rackNumber}/${_id}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          const fetchedData = response.data[0];
          setFormData({
            section: fetchedData.section || '',
            materialName: fetchedData.materialName || '',
            availableStock: fetchedData.availableStock || '',
            issue: fetchedData.issue || '',
            receit: fetchedData.receit || '',
            closingStock: fetchedData.closingStock || '',
          });
        } else {
          console.error('No product data found.');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [rackNumber, _id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    // Calculate closing stock whenever availableStock, issue, or receipt changes
    if (name === 'availableStock' || name === 'issue' || name === 'receit') {
      const availableStock = parseFloat(updatedFormData.availableStock) || 0;
      const issue = parseFloat(updatedFormData.issue) || 0;
      const receit = parseFloat(updatedFormData.receit) || 0;
      updatedFormData.closingStock = availableStock - (issue + receit);
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/rackupdate/${rackNumber}/${_id}`, formData);
      toast.success('Data updated successfully!'); // Show success toast
      navigate(`/about`);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update data. Please try again.'); // Show error toast
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <Toaster /> {/* Place the Toaster component here */}
      <div style={{
        maxWidth: '400px',
        width: '100%',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '24px',
          marginBottom: '20px'
        }} className='custom-table-head'>
          Update Product
        </h2>

        <br></br>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='custom-table-head'>Section:</label>
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
            <label className='custom-table-head'>Issue:</label>
            <input type="number" name="issue" value={formData.issue} onChange={handleChange} />
          </div>

          <br />
          <div>
            <label className='custom-table-head'>Receipt:</label>
            <input type="number" name="receit" value={formData.receit} onChange={handleChange} />
          </div>

          <br />
          <div>
            <label className='custom-table-head'>Closing Stock:</label>
            <input type="number" name="closingStock" value={formData.closingStock} readOnly />
          </div>

          <br />
          <button className='custom-table-head btn btn-outline-success' type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
