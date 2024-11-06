import React, { useState } from "react";

// This component will handle updating file id and name
export default function RackAdminUpdate({ file, rackName, onUpdate }) {
    // Initialize state with current file data
    const [fileId, setFileId] = useState(file._id);
    const [fileName, setFileName] = useState(file.name);
    const [error, setError] = useState("");

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
            // You can make an API request to update the file on the server here
            const response = await fetch(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/racks/${rackName}/files/${fileId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFile),
            });

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
