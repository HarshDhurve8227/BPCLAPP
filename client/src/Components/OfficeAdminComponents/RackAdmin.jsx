import React, { useState, useEffect, useCallback } from "react";
import './RackAdmin.css';
import RackAdminInsert from './RackAdminInsert';

export default function RackAdmin() {
    const [searchTerm, setSearchTerm] = useState("");
    const [openCupboard, setOpenCupboard] = useState(null);
    const [openRack, setOpenRack] = useState(null);
    const [rackData, setRackData] = useState({}); // Rack data state
    const [error, setError] = useState(""); // Error state

    // Fetch all rack data when component mounts
    useEffect(() => {
        fetchAllRackData();
    }, []);  // Empty dependency means it runs on mount

    // Fetch all rack data from the backend
    const fetchAllRackData = async () => {
        const rackNames = ['Rack1A', 'Rack1B', 'Rack1C', 'Rack1D', 'Rack2A', 'Rack2B', 'Rack2C', 'Rack2D'];
        const rackDataPromises = rackNames.map(rackName => fetchRackData(rackName));

        try {
            const racks = await Promise.all(rackDataPromises);
            const combinedRackData = rackNames.reduce((acc, rackName, index) => {
                acc[rackName] = racks[index]; // Store files in the state for each rack
                return acc;
            }, {});
            console.log('Combined Rack Data:', combinedRackData); // Debug log
            setRackData(combinedRackData);  // Update the state with fetched data
        } catch (error) {
            setError("Error fetching rack data.");
        }
    };

    // Fetch data for an individual rack
    const fetchRackData = async (rackName) => {
        try {
            const response = await fetch(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/racks/${rackName}`);
            if (!response.ok) {
                setError(`Failed to fetch ${rackName}: ${response.statusText}`);
                return [];
            }
            const data = await response.json();
            console.log(`Fetched data for ${rackName}:`, data); // Debug log

            // Flatten the files from each rack's data structure
            const files = data.reduce((acc, rack) => {
                return acc.concat(rack.files || []);  // Concatenate all files from each rack
            }, []);
            
            return files;
        } catch (error) {
            console.error(`Error fetching ${rackName} data:`, error);
            setError(`Error fetching ${rackName}: ${error.message}`);
            return [];
        }
    };

    // Handle search term change
    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (!term) {
            setOpenRack(null);  // Reset rack view if search term is cleared
            return;
        }

        const matchingRacks = Object.keys(rackData).filter(rackName =>
            rackData[rackName]?.some(file => file.name?.toLowerCase().includes(term.toLowerCase()))
        );

        setOpenRack(matchingRacks.length > 0 ? matchingRacks[0] : null);
    };

    // Toggle cupboard open/close
    const toggleCupboard = (cupboardName) => {
        setOpenCupboard(openCupboard === cupboardName ? null : cupboardName);
        setOpenRack(null);  // Close rack when cupboard is toggled
    };

    // Memoize filtered files to optimize performance
    const filteredFiles = useCallback((rackName) => {
        return (rackData[rackName] || []).filter(file =>
            file.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [rackData, searchTerm]);

    // Render individual racks
    function renderRack(rackName) {
        const files = filteredFiles(rackName);
        const isRackOpen = openRack === rackName;

        return (
            <div className="rack" key={rackName}>
                <div className="accordion" id={`accordion${rackName}`}>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id={`heading${rackName}`}>
                            <button
                                className={`accordion-button ${isRackOpen ? '' : 'collapsed'}`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${rackName}`}
                                aria-expanded={isRackOpen}
                                aria-controls={`collapse${rackName}`}
                                onClick={() => setOpenRack(isRackOpen ? null : rackName)}
                            >
                                {rackName}
                            </button>
                        </h2>
                        <div
                            id={`collapse${rackName}`}
                            className={`accordion-collapse collapse ${isRackOpen ? "show" : ""}`}
                            aria-labelledby={`heading${rackName}`}
                        >
                            <div className="accordion-body">
                                <RackAdminInsert rackName={rackName} onInsert={fetchAllRackData} /> {/* Pass callback to refresh data */}
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Sr. No</th>
                                            <th>Name of the File</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {files.length > 0 ? (
                                            files.map((file, index) => (
                                                <tr key={file._id}> {/* Use _id from MongoDB for key */}
                                                    <td>{index + 1}</td>
                                                    <td>{file.name}</td>
                                                    <td>
                                                        <button className="btn btn-primary">Update</button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">
                                                    No files found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}  {/* Display error message */}

            {/* Search Section */}
            <div className="search-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for files..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-primary">Search</button>
                </div>
            </div>

            <div className="accordion" id="accordionCupboards">
                {/* Cupboard 1 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="cupboardOneHeader">
                        <button
                            className="accordion-button"
                            type="button"
                            onClick={() => toggleCupboard("Cupboard 1")}
                            aria-expanded={openCupboard === "Cupboard 1"}
                            aria-controls="cupboardOne"
                        >
                            CupBoard 1
                        </button>
                    </h2>
                    <div
                        id="cupboardOne"
                        className={`accordion-collapse collapse ${openCupboard === "Cupboard 1" ? "show" : ""}`}
                        aria-labelledby="cupboardOneHeader"
                    >
                        <div className="accordion-body">
                            {renderRack("Rack1A")}
                            {renderRack("Rack1B")}
                            {renderRack("Rack1C")}
                            {renderRack("Rack1D")}
                        </div>
                    </div>
                </div>

                {/* Cupboard 2 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="cupboardTwoHeader">
                        <button
                            className="accordion-button"
                            type="button"
                            onClick={() => toggleCupboard("Cupboard 2")}
                            aria-expanded={openCupboard === "Cupboard 2"}
                            aria-controls="cupboardTwo"
                        >
                            CupBoard 2
                        </button>
                    </h2>
                    <div
                        id="cupboardTwo"
                        className={`accordion-collapse collapse ${openCupboard === "Cupboard 2" ? "show" : ""}`}
                        aria-labelledby="cupboardTwoHeader"
                    >
                        <div className="accordion-body">
                            {renderRack("Rack2A")}
                            {renderRack("Rack2B")}
                            {renderRack("Rack2C")}
                            {renderRack("Rack2D")}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
