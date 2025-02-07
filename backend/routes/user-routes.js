const express = require('express')
const { addDetails, getAllUsers, getSingleUser, deleteUserById, updateUserDetails }= require('../controllers/user-controllers')
const router = express.Router()

router.post('/', addDetails)
router.get('/', getAllUsers)
router.get('/:id', getSingleUser)
router.delete('/:id', deleteUserById)
router.put('/:id', updateUserDetails)

module.exports = router