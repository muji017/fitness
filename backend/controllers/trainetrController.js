const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config();
const trainerModel = require('../models/trainerModel')
const jwt = require('jsonwebtoken')
const utilities = require('../utilities/userUtilities')

// admin login

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const trainerData = await trainerModel.findOne({ email: email })
        console.log(trainerData)
        if (trainerData) {
            // const passmatch = await bcrypt.compare(password, adminData.password);
            if (password == trainerData.password) {

                const options = {
                    expiresIn: '1h'
                };
                const token = jwt.sign({ _id: trainerData._id }, 'mysecretkey', options);
                

                console.log(trainerData.email);
                res.status(200).json({ trainerId: trainerData._id, trainerToken: token });

            }
            else {
                res.status(401).json({ message: "Email and password don't match" });
            }
        }
        else {
            res.status(404).json({ message: "Email not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports={
    login
}