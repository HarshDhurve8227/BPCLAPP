import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";  // Import useParams to get route params

// This component will handle updating file name by _id
export default function RackAdminUpdate({ onUpdate }) {
    // Get rackName and file _id from route parameters
    const { rackName, _id } = useParams();  // Extract parameters from URL

    // State for file name and error messages
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");

    // Fetch the current file data when the component mounts or parameters change
    useEffect(() => {
        // If rackName or _id is not present, show an error
        if (!rackName || !_id) {
            setError("Invalid rack name or file ID.");
            return;
        }

        const fetchFileData = async () => {
            try {
                // Log for debugging
                console.log("Rack Name: ", rackName);
                console.log("File ID (_id): ", _id);

                const response = await fetch(
                    `https://bpcl2024-a36b07a626d7.herokuapp.com/api/racks/${rackName}/${_id}`
                );
                if (!response.ok) throw new Error("Failed to fetch file data.");
                const data = await response.json();

                // Assuming the response contains the file data (including `name` field)
                setFileName(data.name);  // Directly set the name of the file
            } catch (error) {
                setError(error.message);  // Display error message if fetch fails
            }
        };

        fetchFileData();
    }, [rackName, _id]);  // Only re-run when rackName or _id changes

    // Handle file name change
    const handleFileNameChange = (event) => {
        setFileName(event.target.value);
    };


    // Handle form submission to update file details
    const handleUpdate = async (event) => { 

        event.preventDefault();

        if (!fileName.trim()) {

            setError("File name cannot be empty.");
            return;

        }

        const updatedFile = {
            name: fileName,  // Send the updated name in the body
        };

        try {
            // Make an API request to update the file on the server
            const response = await fetch(
                `https://bpcl2024-a36b07a626d7.herokuapp.com/api/racks/${rackName}/${_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedFile),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update file.");
            }

            // Notify the parent component to refresh the data
            onUpdate();

            // Clear any error and close the update modal
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h3 className="text-center">Update File</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="fileId" className="form-label">
                        File ID
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="fileId"
                        value={_id}  // File _id displayed in the form (read-only)
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="fileName" className="form-label">
                        File Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="fileName"
                        value={fileName}
                        onChange={handleFileNameChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Update File
                </button>
            </form>
        </div>
    );
}
