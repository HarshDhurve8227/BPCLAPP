import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../Product.css';

export default function RackInsert() {
    const navigate = useNavigate();
    const { rackType } = useParams(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [value, setValue] = useState({
        section: "",
        materialName: "",
        availableStock: "",
        issue: "",
        receit: "", 
        closingStock: "",
    });

    const changeHandler = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }; 

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const { section, materialName, availableStock, closingStock, issue, receit } = value;
    
        // Validate required fields
        if (!section || !materialName || availableStock === "" || closingStock === "") {
            setError("Please fill in all required fields.");
            return;
        }
    
        try {
            setLoading(true);
            setError("");
    
            // Ensure rackType is defined
            if (!rackType) {
                throw new Error("Rack type is not defined.");
            }
    
            const endpoint = `https://bpcl2024-a36b07a626d7.herokuapp.com/api/${rackType}/create`;
    
            // Prepare data to send
            const dataToSend = {
                rackType, // Pass rackType directly
                itemData: {
                    section: Number(section), // Ensure it's a Number
                    materialName,
                    availableStock: Number(availableStock),
                    issue: issue ? Number(issue) : undefined,
                    receit: receit ? Number(receit) : undefined,
                    closingStock: Number(closingStock),
                }
            };
    
            console.log("Sending data:", dataToSend); // Log data being sent
    
            const response = await axios.post(endpoint, dataToSend);
    
            if (response.data.success) {
                toast.success(response.data.Message);
                navigate(`/products/${rackType}`);
            } else {
                console.error("Response error:", response.data); // Log response error
                setError(response.data.Message || "Failed to insert product.");
            }
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            setError(error.response?.data?.Message || error.message || "An error occurred while inserting the product.");
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <div className='container-fluid p-5'>
            <form onSubmit={submitHandler}>
                <h1 className='custom-table-head'>Enter Rack Information</h1>
                {/* Form Fields */}
                <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="section" className="form-label fw-bold custom-table-head">Section</label>
                    <input 
                        type="number" // Changed to number
                        name='section' 
                        onChange={changeHandler} 
                        value={value.section} 
                        className="form-control fs-5" 
                        id="section" 
                        placeholder="Enter Section" 
                        
                    />
                </div>
                <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="materialName" className="form-label fw-bold custom-table-head">Material Name</label>
                    <input 
                        type="text" 
                        name='materialName' 
                        onChange={changeHandler} 
                        value={value.materialName} 
                        className="form-control fs-5" 
                        id="materialName" 
                        placeholder="Enter Material Name" 
                    
                    />
                </div>
                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="availableStock" className="form-label fw-bold custom-table-head">Available Stock</label>
                    <input 
                        type="number" 
                        name='availableStock' 
                        onChange={changeHandler} 
                        value={value.availableStock} 
                        className="form-control fs-5" 
                        id="availableStock" 
                        placeholder="Enter Available Stock" 
                        
                    />
                </div>
                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="issue" className="form-label fw-bold custom-table-head">Issue</label>
                    <input 
                        type="number" 
                        name='issue' 
                        onChange={changeHandler} 
                        value={value.issue} 
                        className="form-control fs-5" 
                        id="issue" 
                        placeholder="Enter Issue" 
                    />
                </div>
                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="receit" className="form-label fw-bold custom-table-head">Receit</label>
                    <input 
                        type="number" // Changed to number
                        name='receit' 
                        onChange={changeHandler} 
                        value={value.receit} 
                        className="form-control fs-5" 
                        id="receit" 
                        placeholder="Enter Receit" 
                    />
                </div>
                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="closingStock" className="form-label fw-bold custom-table-head">Closing Stock</label>
                    <input 
                        type="number" 
                        name='closingStock' 
                        onChange={changeHandler} 
                        value={value.closingStock} 
                        className="form-control fs-5" 
                        id="closingStock" 
                        placeholder="Enter Closing Stock" 
                        
                    />
                </div>
                <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                    <NavLink to={`/products/`} className='btn btn-primary me-5 fs-4 custom-table-head'>Cancel</NavLink>
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
            <button
                onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
                className="btn btn-secondary position-fixed bottom-0 end-0 m-3"
                style={{ zIndex: 1000 }}
            >
                Scroll Down
            </button>
        </div>
    )
}
