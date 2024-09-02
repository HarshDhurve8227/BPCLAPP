import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Product.css';

export default function UpdateProduct() {
    const navigate = useNavigate();
    const { id, department } = useParams(); // Extract department and id from route params
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

    // Fetch product details when component mounts or id/department changes
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/api/${department}/product/${id}`);
                if (response.status === 200) {
                    setValue(response.data);
                } else {
                    setError("Failed to fetch product details.");
                }
            } catch (error) {
                setError("An error occurred while fetching product details.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (department && id) {
            fetchProduct();
        } else {
            setError("Invalid department or product ID.");
        }
    }, [id, department]);

    // Recalculate ExcessShortFall whenever AvailableStock or MinStock changes
    useEffect(() => {
        const availableStock = parseFloat(value.AvailableStock) || 0;
        const minStock = parseFloat(value.MinStock) || 0;
        const excessShortFall =  availableStock - minStock;

        setValue(prevValue => ({
            ...prevValue,
            ExcessShortFall: excessShortFall
        }));
    }, [value.AvailableStock, value.MinStock]);

    // Update StatusofOrder based on ExcessShortFall
    useEffect(() => {
        setValue(prevValue => ({
            ...prevValue,
            StatusofOrder: prevValue.ExcessShortFall <= 0 ? 'Order to place' : 'Available'
        }));
    }, [value.ExcessShortFall]);

    // Handle input changes
    const changeHandler = (e) => {
        setValue(prevValue => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }));
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await axios.put(`http://localhost:4000/api/${department}/update/${id}`, value);

            if (response.data.success) {
                toast.success(response.data.Message);
                navigate('/products');
            } else {
                setError(response.data.Message || "Failed to update product.");
            }
        } catch (error) {
            setError("An error occurred while updating the product.");
            console.error(error);
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
                <h1 className='custom-table-head'>Update Product Information</h1>

                {/* Input fields for the product details */}
                <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="srno" className="form-label fw-bold custom-table-head">Serial Number</label>
                    <input
                        type="number"
                        name='srno'
                        onChange={changeHandler}
                        value={value.srno || ""}
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
                        value={value.Assets || ""}
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
                        value={value.ComponentsAndEquipments || ""}
                        className="form-control fs-5"
                        id="ComponentsAndEquipments"
                        placeholder="Enter Components and Equipments"
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="AvailableStock" className="form-label fw-bold custom-table-head">Available Stock</label>
                    <input
                        type="number"
                        name='AvailableStock'
                        onChange={changeHandler}
                        value={value.AvailableStock || ""}
                        className="form-control fs-5"
                        id="AvailableStock"
                        placeholder="Enter Available Stock"
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="MinStock" className="form-label fw-bold custom-table-head">Min Stock</label>
                    <input
                        type="number"
                        name='MinStock'
                        onChange={changeHandler}
                        value={value.MinStock || ""}
                        className="form-control fs-5"
                        id="MinStock"
                        placeholder="Enter Min Stock"
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="LeadTime" className="form-label fw-bold custom-table-head">Lead Time</label>
                    <input
                        type="number"
                        name='LeadTime'
                        onChange={changeHandler}
                        value={value.LeadTime || ""}
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
                        value={value.ExcessShortFall || ""}
                        className="form-control fs-5"
                        id="ExcessShortFall"
                        placeholder="Excess / Short Fall"
                        readOnly
                    />
                </div>

                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="StatusofOrder" className="form-label fw-bold custom-table-head">Status Of Order</label>
                    <input
                        type="text"
                        name='StatusofOrder'
                        value={value.StatusofOrder || ""}
                        className="form-control fs-5"
                        id="StatusofOrder"
                        placeholder="Status of Order"
                    />
                </div>

                <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                    <NavLink to={`/products/${department}`} className='btn btn-primary me-5 fs-4 custom-table-head'>Cancel</NavLink>
                    <button
                        type="submit"
                        className="btn btn-primary fs-4"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
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
