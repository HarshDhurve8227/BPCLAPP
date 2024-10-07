import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './AMCInsert.css'; // Use the same styles as AMCInsert

export default function AMCUpdate() {
    const [equipment, setEquipment] = useState({

        equipment: '',
        company: '',
        validity: { from: '', to: '' },
        pms: '',
        vendorCode: '',
        contractNumber: '',

        concernedPerson: '',

        mobileNumber: '',

        lastDateOfChecking: '',

        nextDueDate: '',

    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Get the ID from the URL

    // Fetch existing equipment details
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/equipment/get/${id}`);

                // Ensure the fetched data is an array and has at least one item
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const fetchedData = response.data[0]; // Access the first object in the array

                    console.log('Fetched Equipment Data:', fetchedData);

                    const formatDate = (dateString) => {
                        return dateString ? dateString.split('T')[0] : ''; // Get the date part only
                    };

                    setEquipment({
                        equipment: fetchedData.equipment || '',
                        company: fetchedData.company || '',
                        validity: {
                            from: formatDate(fetchedData.validity?.from) || '',
                            to: formatDate(fetchedData.validity?.to) || ''
                        },
                        pms: fetchedData.pms || '',
                        vendorCode: fetchedData.vendorCode || '',
                        contractNumber: fetchedData.contractNumber || '',
                        concernedPerson: fetchedData.concernedPerson || '',
                        mobileNumber: fetchedData.mobileNumber || '',
                        lastDateOfChecking: formatDate(fetchedData.lastDateOfChecking) || '',
                        nextDueDate: formatDate(fetchedData.nextDueDate) || '',

                    });
                } else {
                    setError('No equipment data found.');
                }
            } catch (error) {
                setError('Failed to fetch equipment: ' + error.message);
            }
        };

        fetchEquipment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'from' || name === 'to') {
            setEquipment((prev) => ({
                ...prev,
                validity: { ...prev.validity, [name]: value }
            }));
        } else {
            setEquipment((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            await axios.put(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/equipment/updated/${id}`, equipment);
            navigate('/amc');

             // Redirect to the AMC page after successful update      
        } catch (error) {



        


            setError('Failed to update equipment: ' + (error.response?.data?.message || error.message));
        }

    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100vh',
            backgroundColor: '#f9f9f9',
            paddingTop: '50px'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                width: '500px',
                marginTop: '50px'
            }}>
                <h3 className="text-primary">Update Equipment Information</h3>
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="custom-table-head">
                            Equipment:
                            <input type="text" name="equipment" value={equipment.equipment} placeholder="Equipment" onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Company:
                            <input type="text" name="company" value={equipment.company} placeholder="Company" onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Validity From:
                            <input type="date" name="from" value={equipment.validity.from} onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Validity To:
                            <input type="date" name="to" value={equipment.validity.to} onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            PMS:
                            <select name="pms" value={equipment.pms} onChange={handleChange}>
                                <option value="">Select PMS</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                            </select>
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Vendor Code:
                            <input type="text" name="vendorCode" value={equipment.vendorCode} placeholder="Vendor Code" onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Contract Number:
                            <input type="text" name="contractNumber" value={equipment.contractNumber} placeholder="Contract Number" onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Concerned Person:
                            <input type="text" name="concernedPerson" value={equipment.concernedPerson} placeholder="Concerned Person" onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Mobile Number:
                            <input type="text" name="mobileNumber" value={equipment.mobileNumber} placeholder="Mobile Number" onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Last Date of Checking:
                            <input type="date" name="lastDateOfChecking" value={equipment.lastDateOfChecking} onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Next Due Date:
                            <input type="date" name="nextDueDate" value={equipment.nextDueDate} onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <button className="custom-table-head btn btn-outline-success" type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}
