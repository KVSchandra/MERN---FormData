import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // Initialize state with name, email, and age
    const [post, setPost] = useState({ name: "", email: "", age: "" });

    useEffect(() => {
        fetch(`https://mern-formdata-1-backend.onrender.com/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data.data))
            .catch((err) => console.error("Error fetching post:", err));
    }, [id]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://mern-formdata-1-backend.onrender.com/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post),
            });

            if (response.ok) {
                navigate("/");
            } else {
                console.error("Failed to update post");
            }
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={post.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={post.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={post.age}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success mb-4">Update</button>
            </form>
        </div>
    );
};

export default Update;
