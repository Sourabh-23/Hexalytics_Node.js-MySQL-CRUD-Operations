const express = require('express')
const { getUsers, getUserByID, createUser, updateUser, deleteUser } = require('../controllers/userController')

// router object

const router = express.Router()

//routes

// GET ALL USER LIST || GET
router.get('/getall',getUsers)

//get users by id
router.get('/get/:id',getUserByID)

// create user || post
router.post('/create',createUser)

// update user || put
router.put('/update/:id',updateUser)


// delete user = delete
router.delete('/delete/:id', deleteUser)

module.exports=router;