const ModelUser = require('../models/m_users');
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = Number(process.env.SALTROUNDS);
const secretKey = process.env.SECRETKEY;

class ControllerUser {

    static getUsers (req,res) {
        ModelUser.find()
            .then(result => {
                res.status(200).json({
                    message: 'Get all users successful !',
                    result
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Bad request: Get all  users error !',
                    error
                })    
            })
    }

    static register (req,res) {
        let { username, password } = req.body;

        let hash = bcrypt.hashSync(password, saltRounds);

        let newObj = {
            username,
            password: hash
        }

        let newUser = new ModelUser(newObj);

        if (username == '' || password == '') {
            res.status(400).json({
                message: 'Bad request: username or password cannot be empty !'
            })

        } else {
            newUser.save()
            .then(result => {
                res.status(201).json({
                    message: 'New user registration successful !',
                    result
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Bad request: user registration error !',
                    error
                })
            })

        }
    }


    static login (req,res) {
        let { username, password } = req.body;

        ModelUser.findOne({username:username}, function(err,result) {
            if (err) {
                res.status(400).json({
                    message: 'Bad request: username is not registered !',
                    error
                })

            } else {

                let hashCheck = bcrypt.compareSync(password, result.password); // true
                console.log('==================', hashCheck);

                if (hashCheck == true) {
                    res.status(200).json({
                        message: 'User login successful !',
                        result
                    })

                } else {
                    res.status(400).json({
                        message: 'Bad request: incorrect username or password !'
                    })
    
                }

            }
            
        })




    }

    
}


module.exports = ControllerUser;