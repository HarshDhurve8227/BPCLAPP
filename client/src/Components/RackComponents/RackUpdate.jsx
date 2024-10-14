import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function RackUpdate() {
  const { rackNumber, id } = useParams();
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
        const response = await axios.get(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/rack/${rackNumber}/${id}`);
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
  }, [rackNumber, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/rackupdate/${rackNumber}/${id}`, formData);
      navigate(`/insertproducts/${rackNumber}`);
    } catch (error) {
      console.error('Error updating product:', error);
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
  textAlign: 'center', // Center the text
  fontSize: '24px',   // Increase the font size
  marginBottom: '20px' // Add some space below the heading
}} className='custom-table-head'>
  Update Product
</h2>

<br></br>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='custom-table-head'>Section:</label>
            <input type="number" name="section" value={formData.section} onChange={handleChange} required />
          </div>
          <div>

            <br></br>
            <label className='custom-table-head'>Material Name:</label>
            <input type="text" name="materialName" value={formData.materialName} onChange={handleChange} required />
          </div>
          <div>

          <br></br>
            <label className='custom-table-head'>Available Stock:</label>
            <input type="number" name="availableStock" value={formData.availableStock} onChange={handleChange} required />
          </div>
          <div>

          <br></br>
            <label className='custom-table-head'>Issue:</label>
            <input type="number" name="issue" value={formData.issue} onChange={handleChange} />
          </div>
          <div>

          <br></br>
            <label className='custom-table-head'>Receipt:</label>
            <input type="number" name="receit" value={formData.receit} onChange={handleChange} />
          </div>
          <div>

          <br></br>
            <label className='custom-table-head'>Closing Stock:</label>
            <input type="number" name="closingStock" value={formData.closingStock} onChange={handleChange} required />
          </div>
          <br></br>
          <button className='custom-table-head' type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
