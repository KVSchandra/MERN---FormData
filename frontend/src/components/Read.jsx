import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/user")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched posts:", data); 
                setPosts(data.data); 
            })
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/api/user/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setMessage("Post deleted successfully!");
                setPosts(posts.filter((post) => post._id !== id)); 
            } else {
                setMessage("Failed to delete post.");
            }
        } catch (error) {
            setMessage("Error deleting post.");
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">All Posts</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="row">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{post.name}</h5>
                                    <p className="card-text">
                                        <strong>Email:</strong> {post.email} <br />
                                        <strong>Age:</strong> {post.age} {/* Display Age */}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/update/${post._id}`} className="btn btn-warning">Edit</Link>
                                        <button onClick={() => handleDelete(post._id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No posts available.</p>
                )}
            </div>
        </div>
    );
};

export default Read;
