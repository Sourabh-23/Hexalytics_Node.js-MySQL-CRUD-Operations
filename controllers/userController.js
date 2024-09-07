const db = require('../config/db');


// GET ALL USERS
const getUsers =async (req,res) =>{

    try{
         const data = await db.query('SELECT * FROM users')
         if(!data){
            return res.status(404).send({
            success:false,
            message:'no record found'
        })
         }
    res.status(200).send({
        success:true,
        message:'All user Records',
        totalUsers:data[0].length,
        data: data[0],
    });

    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Get all User api'
            
        })
        
    }
};


// Get  BY id

const getUserByID = async(req,res)=>{
    try{
           const userId = req.params.id
           if(!userId){
            return res.status(404).send({
            success:false,
            message:'Invalid or Provide UserId'
        })
         }
         const data =await db.query('SELECT * FROM users WHERE id=?',[userId])
         if(!data){
            return res.status(404).send({
            success:false,
            message:'no record found'
        })
         }
         res.status(200).send({
            success:true,
            userDetails: data[0],
        });


    }catch(error){
        console.log( error);
        res.status(500).send({
            success:false,
            message:'Error in Get  User id api',
            error
        })
    }
};


// CREATE USER

const createUser = async (req, res) => {
    try {
        const { name, surname, email } = req.body;

        // Validate input
        if (!name || !surname || !email) {
            return res.status(400).send({
                success: false,
                message: 'Please provide name, surname, and email'
            });
        }

        // Insert the new user into the database
        const result = await db.query('INSERT INTO users (name, surname, email) VALUES (?, ?, ?)', [name, surname, email]);

        // Check if the insertion was successful
        if (result[0].affectedRows === 1) {
            res.status(201).send({
                success: true,
                message: 'New User Record Created',
                userId: result[0].insertId
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'Failed to create user'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Create User API',
            error
        });
    }
};


// update user


const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, surname, email } = req.body;

        if (!userId || !name || !surname || !email) {
            return res.status(400).send({
                success: false,
                message: 'Please provide userId, name, surname, and email'
            });
        }

        const result = await db.query(
            'UPDATE users SET name = ?, surname = ?, email = ? WHERE id = ?',
            [name, surname, email, userId]
        );




        if (result[0].affectedRows === 1) {
            return res.status(200).send({
                success: true,
                message: 'User record updated successfully'
            });
        }

        res.status(404).send({
            success: false,
            message: 'User record not found or no changes made'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update User API',
            error
        });
    }
};



// user deete
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).send({
                success: false,
                message: 'Please provide a userId'
            });
        }

        const result = await db.query('DELETE FROM users WHERE id = ?', [userId]);

        if (result[0].affectedRows === 1) {
            return res.status(200).send({
                success: true,
                message: 'User record deleted successfully'
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'User record not found'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Delete User API',
            error
        });
    }
};











module.exports = {getUsers,getUserByID,createUser,updateUser,deleteUser};



