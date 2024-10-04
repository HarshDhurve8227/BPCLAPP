// About.js
import React from "react";
import './Product.css';
import { NavLink } from "react-router-dom";
import RackInsert from "./RackComponents/RackInsert"; // You may not need this import anymore

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
                {/* NavLink for inserting new item */}
                <NavLink to={`/insertproducts/${rackNumber}`} className="btn btn-primary mb-3">
                  Insert New Item
                </NavLink>

                <div className="table-container">
                  <div className="table-wrapper">
                    <table className="table table-striped table-hover mt-3 fs-5">
                      <thead>
                        <tr className="custom-table-head">
                          <th scope="col">Section</th>
                          <th scope="col">Material name</th>
                          <th scope="col">Available Stock</th>
                          <th scope="col">Issue</th>
                          <th scope="col">Receit</th>
                          <th scope="col">Closing Stock</th>
                          <th scope="col">Update</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody className='custom-table-body'>
                        {/* Populate rows dynamically if needed */}
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
