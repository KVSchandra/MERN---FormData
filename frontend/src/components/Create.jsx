import React, { useState } from "react";

const Create = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: ""
    });

    const [message, setMessage] = useState(""); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://mern-formdata-1-backend.onrender.com/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("User created successfully!");
                setFormData({ name: "", email: "", age: "" });
            } else {
                setMessage(result.error || "Something went wrong");
            }
        } catch (error) {
            setMessage("Error connecting to server.");
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Enter the Data</h2>
            {message && <div className="alert alert-info">{message}</div>} {}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter Name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label">Age</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Age" 
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-4">Submit</button>
            </form>
        </div>
    );
};

export default Create;
