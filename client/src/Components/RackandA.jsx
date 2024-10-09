// About.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import './Product.css';
import { NavLink } from "react-router-dom";

export default function About() {
  const technicianKosanRacks = [1, 2];
  const technicianRacks = [3, 4, 5, 6, 14, 15, 16, 17, 23, 24];
  const electricianRacks = [7, 8, 9, 10, 18, 21, 22];
  const fireFightingRacks = [11, 12, 13, 19, 20];

  const allRacks = [
    ...technicianKosanRacks,
    ...technicianRacks,
    ...electricianRacks,
    ...fireFightingRacks,
  ];

  // State to hold rack data
  const [rackData, setRackData] = useState({});

  useEffect(() => {
    // Fetch data for each rack
    const fetchRackData = async () => {
      const data = {};
      for (const rackNumber of allRacks) {
        try {
          const response = await axios.get(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/rack/${rackNumber}`);
          data[rackNumber] = response.data; // Assuming the API returns an array of items
        } catch (error) {
          console.error(`Error fetching data for rack ${rackNumber}:`, error);
        }
      }
      setRackData(data);
    };

    fetchRackData();
  }, []);

  const handleDelete = async (id) => {
    // Handle delete logic here
  };

  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      {allRacks.map((rackNumber) => (
        <div className="accordion-item" key={rackNumber}>
          <h2 className="accordion-header" id={`panelsStayOpen-heading${rackNumber}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#panelsStayOpen-collapse${rackNumber}`}
              aria-expanded="false"
              aria-controls={`panelsStayOpen-collapse${rackNumber}`}
            >
              {`RACK ${rackNumber} - ${
                technicianKosanRacks.includes(rackNumber) ? 'Technician/Kosan' : 
                technicianRacks.includes(rackNumber) ? 'Technician' : 
                electricianRacks.includes(rackNumber) ? 'Electrician' : 
                fireFightingRacks.includes(rackNumber) ? 'Fire Fighting' : 
                'Other'
              }`}
            </button>
          </h2>

          <div id={`panelsStayOpen-collapse${rackNumber}`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-heading${rackNumber}`}>
            <div className="accordion-body">
              <div className='container-fluid p-5'>
                <NavLink to={`/insertproducts/${rackNumber}`} className="btn btn-primary mb-3">
                  Insert New Item
                </NavLink>

                <div className="table-container">
                  <div className="table-wrapper">
                    <table className="table table-striped table-hover mt-3 fs-5">
                      <thead>
                        <tr className="custom-table-head">
                          <th scope="col">Section</th>
                          <th scope="col">Material Name</th>
                          <th scope="col">Available Stock</th>
                          <th scope="col">Issue</th>
                          <th scope="col">Receipt</th>
                          <th scope="col">Closing Stock</th>
                          <th scope="col">Update</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody className='custom-table-body'>
                        {rackData[rackNumber] && rackData[rackNumber].map((item) => (
                          <tr key={item.id}>
                            <td>{item.section}</td>
                            <td>{item.materialName}</td>
                            <td>{item.availableStock}</td>
                            <td>{item.issue}</td>
                            <td>{item.receit}</td>
                            <td>{item.closingStock}</td>
                            <td>
                              <NavLink to={`/rackupdate/${rackNumber}/${item.id}`} className="btn btn-warning">Update</NavLink>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                          </tr>
                        ))} 
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
