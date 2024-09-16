import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

export default function Products() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const department = 'Electrician'; // Define the department value here

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchUser = await axios.get(`http://localhost:4000/api/${department}/product`);
                const response = fetchUser.data;
                console.log('API Response:', response); // Log the response to check its structure
                
                const fetchedData = Array.isArray(response.users) ? response.users : [];
                const sortedData = fetchedData.sort((a, b) => a.srno - b.srno);
                
                setData(sortedData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [department]);

    const deleteProduct = async (id) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to permanently delete this item? This action cannot be undone.");

        if (!isConfirmed) {
            // If user cancels, exit the function
            return;
        }

        console.log(`Deleting product with id: ${id}`);

        try {
            const response = await axios.delete(`http://localhost:4000/api/${department}/delete/${id}`);

            if (response.data.success) {
                console.log(response.data.message);
                // Remove the deleted product from the state
                setData(data.filter((item) => item._id !== id));
            } else {
                console.error('Failed to delete product:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }
    };

    return (
        <>
            <div className='container-fluid p-5'>
                <h1 className='text-center text-danger '> Electrician Inventory</h1>
                <div className='add_button'>
                    <NavLink to={`/insertproduct/${department}`} className='btn btn-primary fs-5 custom-table-head'>
                        + Add New Line From Here
                    </NavLink>
                </div>
                <div className="table-container">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        data.length > 0 ? (
                            <div className="table-wrapper">
                                <table className="table table-striped table-hover mt-3 fs-5">
                                    <thead>
                                        <tr className="custom-table-head">
                                            <th scope="col">Serial Number</th>
                                            <th scope="col">Assets</th>
                                            <th scope="col">Components/Equipments</th>
                                            <th scope="col">Available stock</th>
                                            <th scope="col">Min Stock</th>
                                            <th scope="col">Lead time</th>
                                            <th scope="col">Excess/Short Fall</th>
                                            <th scope="col">Status of Order</th>
                                            <th scope="col">Update</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className='custom-table-body'>
                                        {data.map((element) => (
                                            <tr key={element._id}> {/* Use _id as the key */}
                                                <td>{element.srno}</td>
                                                <td>{element.Assets}</td>
                                                <td>{element.ComponentsAndEquipments}</td>
                                                <td>{element.AvailableStock}</td>
                                                <td>{element.MinStock}</td>
                                                <td>{element.LeadTime}</td>
                                                <td>{element.ExcessShortFall}</td>
                                                <td style={{
                                                    backgroundColor: element.ExcessShortFall <= 0 ? 'red' : 'green',
                                                    color: 'white'
                                                }}>
                                                    {element.StatusofOrder}
                                                </td>
                                                <td>
                                                    <NavLink to={`/updateproduct/${department}/${element._id}`} className="btn btn-primary">
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                        Update
                                                    </NavLink>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => deleteProduct(element._id)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No products available</p>
                        )
                    )}
                </div>
            </div>
        </>
    );
}
