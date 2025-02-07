const user = require('../models/userSchema')

const addDetails = async (req, res) => {
    try {
        const newUserDetails = req.body
        const newlyCreatedUser = await user.create(newUserDetails)
        if(newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: "User has been added successfully",
                data: newlyCreatedUser
            })
        }
        else {
            res.status(500).json({
                success: false,
                message: "Invalid user details"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Failed to add user! Try Again, ${err}`
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUserDetails = await user.find()
        if(allUserDetails) {
            res.status(200).json({
                success: true,
                message: "All user details fetches successfully",
                data: allUserDetails
            })
        } else {
            res.status(404).json({
                success: false,
                message: "User details does not exist!"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong! Try again, ${err}`
        })
    }
}

const getSingleUser = async (req, res) => {
    const { id } = req.params
    try {
        const singleUser = await user.findById(id);
        if(singleUser) {
            res.status(201).json({
                success: true,
                message: `User with id ${id} has been fetched successfully`,
                data : singleUser
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not Found!"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong! Try again, ${err}`
        })
    }
}

const deleteUserById = async (req, res) => {
    const { id } = req.params
    try {
        const singleUser = await user.findByIdAndDelete(id);
        if(singleUser) {
            res.status(201).json({
                success: true,
                message: `User with id ${id} has been fetched successfully`,
                data : singleUser
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not Found!"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong! Try again, ${err}`
        })
    }
}

const updateUserDetails = async (req, res) => {
    const { id } = req.params
    const newUserDetails = req.body
    try {
        const updatedUserDetails = await user.findByIdAndUpdate(id, req.body, {new: true})
        if(updatedUserDetails) {
            res.status(201).json({
                success: true,
                message: `User with id ${id} has been updated successfully`,
                data : updatedUserDetails
            })
        }
        else {
            res.status(200).json({
                success: false,
                message: "Either user already exists or failed to update details correctly!"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong! Try again, ${err}`
        })
    } 
}

module.exports = { addDetails, getAllUsers, getSingleUser, deleteUserById, updateUserDetails } 