import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function RackUpdate() {
  const { rackNumber, id } = useParams(); // Get rackNumber and id from params
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
    console.log('Fetching product data for rack:', rackNumber, 'and product ID:', id);
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/rack/${rackNumber}/${id}`);
        console.log('Fetched data:', response.data); // Check the structure of the response
        setFormData({
          section: response.data.section || '',
          materialName: response.data.materialName || '',
          availableStock: response.data.availableStock || '',
          issue: response.data.issue || '',
          receit: response.data.receit || '',
          closingStock: response.data.closingStock || '',
        });
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
      await axios.put(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/rack/${rackNumber}/${id}`, formData);
      navigate(`/insertproducts/${rackNumber}`); // Redirect after successful update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Section:</label>
          <input type="number" name="section" value={formData.section} onChange={handleChange} required />
        </div>
        <div>
          <label>Material Name:</label>
          <input type="text" name="materialName" value={formData.materialName} onChange={handleChange} required />
        </div>
        <div>
          <label>Available Stock:</label>
          <input type="number" name="availableStock" value={formData.availableStock} onChange={handleChange} required />
        </div>
        <div>
          <label>Issue:</label>
          <input type="number" name="issue" value={formData.issue} onChange={handleChange} />
        </div>
        <div>
          <label>Receipt:</label>
          <input type="number" name="receit" value={formData.receit} onChange={handleChange} />
        </div>
        <div>
          <label>Closing Stock:</label>
          <input type="number" name="closingStock" value={formData.closingStock} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
