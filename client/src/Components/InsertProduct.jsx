


import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Product.css';

export default function InsertProduct() {
    const navigate = useNavigate();
    const { department } = useParams(); // Extract department from URL params
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [value, setValue] = useState({
        srno: "",
        Assets: "",
        ComponentsAndEquipments: "",
        AvailableStock: "",
        MinStock: "",
        LeadTime: "",
        ExcessShortFall: "",
        StatusofOrder: ""
    });

    useEffect(() => {
        // Calculate ExcessShortFall whenever AvailableStock or MinStock changes
        const availableStock = parseFloat(value.AvailableStock) || 0;
        const minStock = parseFloat(value.MinStock) || 0;
        setValue(prevValue => ({
            ...prevValue,
            ExcessShortFall: availableStock - minStock
        }));
    }, [value.MinStock, value.AvailableStock]);

    useEffect(() => {
        // Update StatusofOrder based on ExcessShortFall
        const excessShortFall = parseFloat(value.ExcessShortFall) || 0;
        setValue(prevValue => ({
            ...prevValue,
            StatusofOrder: excessShortFall <= 0 ? 'Order to place' : 'Available'
        }));
    }, [value.ExcessShortFall]);

    const changeHandler = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        console.log('Department:', department); // Log department to verify
        console.log('Data being sent:', value); // Log data being sent

        try {
            setLoading(true);
            setError("");

            // Validate department parameter
            if (!department) {
                throw new Error('Department is not specified');
            }

            // Construct the endpoint based on department
            const endpoint = `http://localhost:4000/api/${department}/create`;
            console.log('Constructed Endpoint:', endpoint); // For debugging

            // Perform the POST request
            const response = await axios.post(endpoint, value);

            // Handle the response
            if (response.data.success) {
                toast.success(response.data.Message);
                navigate('');
            } else {
                setError(response.data.Message || "Failed to insert product.");
            }
        } catch (error) {
            setError(error.response?.data?.Message || error.message || "An error occurred while inserting the product.");
            console.error('Error details:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Scroll to the bottom of the page
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className='container-fluid p-5'>
            <form onSubmit={submitHandler}>
                <h1 className='custom-table-head'>Enter Information</h1>
                {/* Form Fields */}
                <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="srno" className="form-label fw-bold custom-table-head">Serial Number</label>
                    <input 
                        type="number" 
                        name='srno' 
                        onChange={changeHandler} 
                        value={value.srno} 
                        className="form-control fs-5" 
                        id="srno" 
                        placeholder="Enter Serial Number" 
                    />
                </div>

                <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="Assets" className="form-label fw-bold custom-table-head">Assets</label>
                    <input 
                        type="text" 
                        name='Assets' 
                        onChange={changeHandler} 
                        value={value.Assets} 
                        className="form-control fs-5" 
                        id="Assets" 
                        placeholder="Enter Assets" 
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="ComponentsAndEquipments" className="form-label fw-bold custom-table-head">Components and Equipments</label>
                    <input 
                        type="text" 
                        name='ComponentsAndEquipments' 
                        onChange={changeHandler} 
                        value={value.ComponentsAndEquipments} 
                        className="form-control fs-5" 
                        id="ComponentsAndEquipments" 
                        placeholder="Enter Components and Equipments" 
                        required
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="AvailableStock" className="form-label fw-bold custom-table-head">Available Stock</label>
                    <input 
                        type="number" 
                        name='AvailableStock' 
                        onChange={changeHandler} 
                        value={value.AvailableStock} 
                        className="form-control fs-5" 
                        id="AvailableStock" 
                        placeholder="Enter Available Stock" 
                        required
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="MinStock" className="form-label fw-bold custom-table-head">Min Stock</label>
                    <input 
                        type="number" 
                        name='MinStock' 
                        onChange={changeHandler} 
                        value={value.MinStock} 
                        className="form-control fs-5" 
                        id="MinStock" 
                        placeholder="Enter Min Stock" 
                        required
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="LeadTime" className="form-label fw-bold custom-table-head">Lead Time</label>
                    <input 
                        type="number" 
                        name='LeadTime' 
                        onChange={changeHandler} 
                        value={value.LeadTime} 
                        className="form-control fs-5" 
                        id="LeadTime" 
                        placeholder="Enter Lead Time"
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="ExcessShortFall" className="form-label fw-bold custom-table-head">Excess / Short Fall</label>
                    <input 
                        type="number" 
                        name='ExcessShortFall' 
                        value={value.ExcessShortFall} 
                        className="form-control fs-5" 
                        id="ExcessShortFall" 
                        placeholder="Enter Excess / Short Fall"
                        readOnly
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="StatusofOrder" className="form-label fw-bold custom-table-head">Status Of Order</label>
                    <input 
                        type="text" 
                        name='StatusofOrder' 
                        onChange={changeHandler} 
                        value={value.StatusofOrder} 
                        className="form-control fs-5" 
                        id="StatusofOrder" 
                        placeholder="Enter Status of Order" 
                        required
                    />
                </div>

                <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                    <NavLink to={`/products/${department}`} className='btn btn-primary me-5 fs-4 custom-table-head'>Cancel</NavLink>
                    <button 
                        type="submit" 
                        className="btn btn-primary fs-4" 
                        disabled={loading}
                    >
                        {loading ? 'Inserting...' : 'Insert'}
                    </button>
                </div>

                <div className="col text-center col-lg-6">
                    {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
                </div>
            </form>

            {/* Scroll Down Button */}
            <button
                onClick={scrollToBottom}
                className="btn btn-secondary position-fixed bottom-0 end-0 m-3"
                style={{ zIndex: 1000 }}
            >
                Scroll Down
            </button>
        </div>
    );
}
