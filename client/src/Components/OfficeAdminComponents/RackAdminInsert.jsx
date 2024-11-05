import React, { useState } from "react";
import { toast } from 'react-hot-toast'; // Import React Hot Toast


export default function RackAdminInsert({ rackName, onInsert }) { 
    const [newFileName, setNewFileName] = useState(""); 
    const [fileId, setFileId] = useState(""); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 

    // Toastify success and error messages
    const showToast = (message, type) => {
        if (type === 'success') {
            toast.success(message);  // Success toast
        } else {
            toast.error(message);    // Error toast
        }
    };

    const handleInsert = async () => { 
        if (!newFileName || !fileId) { 
            setError("Both fields are required.");
            showToast("Both fields are required.", 'error'); // Show error toast
            return; 
        }
        setError(""); 
        setLoading(true); 

        try {
            const response = await fetch(`https://bpcl2024-a36b07a626d7.herokuapp.com/api/racks/${rackName}`, { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    files: [{ id: Number(fileId), name: newFileName }]
                }), 
            }); 

            if (response.ok) { 
                setNewFileName(""); 
                setFileId(""); 
                onInsert(); // Callback to handle after successful insertion
                showToast('File inserted successfully!', 'success'); // Show success toast
            } else {
                const errorMessage = await response.text();
                setError(`Error inserting file: ${response.statusText} - ${errorMessage}`);
                showToast(`Error inserting file: ${response.statusText}`, 'error'); // Show error toast
            }
        } catch (error) {
            setError(`Error inserting file: ${error.message}`);
            showToast(`Error inserting file: ${error.message}`, 'error'); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="input-group mb-3">
            <input
                type="number"
                className="form-control"
                placeholder="File ID"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
            />
            <input
                type="text"
                className="form-control"
                placeholder="New file name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
            />
            <button
                className="btn btn-success"
                onClick={handleInsert}
                disabled={loading}
            >
                {loading ? "Inserting..." : "Insert"}
            </button>
            {error && <div className="text-danger mt-2">{error}</div>}
        </div>
    );
}
