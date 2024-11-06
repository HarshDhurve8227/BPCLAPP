import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Import useParams to get route params

// This component will handle updating file id and name
export default function RackAdminUpdate({ onUpdate }) {
    // Get rackName and fileId from route parameters
    const { rackName, fileId } = useParams();

    // Initialize state with current file data
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");

    // Fetch the current file data when the component mounts or params change
    useEffect(() => {
        const fetchFileData = async () => {
            if (!rackName || !fileId) {
                setError("Invalid rack name or file ID.");
                return;
            }

            try {
                const response = await fetch(
                    `https://bpcl2024-a36b07a626d7.herokuapp.com/api/racks/${rackName}/${fileId}`
                );
                if (!response.ok) throw new Error("Failed to fetch file data.");
                const data = await response.json();
                setFileName(data.name);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchFileData();
    }, [rackName, fileId]); // Rerun the effect when rackName or fileId changes

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

        // Construct the updated file object
        const updatedFile = {
            name: fileName, // Send only the updated name field, fileId is part of the URL
        };

        try {
            // Make an API request to update the file on the server here
            const response = await fetch(
                `https://bpcl2024-a36b07a626d7.herokuapp.com/api/racks/${rackName}/${fileId}`,
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
                        value={fileId}
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
