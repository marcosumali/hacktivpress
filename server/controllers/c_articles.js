const ModelArticle = require('../models/m_articles');
const ModelUser = require('../models/m_users');

const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = Number(process.env.SALTROUNDS);
const secretKey = process.env.SECRETKEY;

class ControllerUser {

    static getArticles (req,res) {
        ModelArticle.find()
        .populate('Author')
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Get allarticles successful !',
                result
            })
        })
        .catch(error => {
            res.status(400).json({
                message: 'Bad request: Get all articles error !',
                error
            })    
        })
    }


    static getByCategory (req,res) {

        let {category} = req.body;

        ModelArticle.find()
        .populate('Author')
        .exec()
        .then(results => {

            let arrResults = [];

            for (let i = 0; i < results.length; i++) {
                if (results[i].category == category) {
                    arrResults.push(results[i])
                }
            }

            res.status(200).json({
                message: 'Get articles by category successful !',
                result: arrResults
            })
        })
        .catch(error => {
            res.status(400).json({
                message: 'Bad request: Get articles by cateogry error !',
                error
            })    
        })

    }


    static getByAuthor (req,res) {

        let {authorname} = req.body;

        ModelArticle.find()
        .populate('Author')
        .exec()
        .then(results => {

            let arrResults = [];

            for (let i = 0; i < results.length; i++) {
                if (results[i].Author.username == authorname) {
                    arrResults.push(results[i])
                }
            }

            res.status(200).json({
                message: 'Get articles by author successful !',
                result: arrResults
            })
        })
        .catch(error => {
            res.status(400).json({
                message: 'Bad request: Get articles by author error !',
                error
            })    
        })

    }


    static createData (req,res) {
        let {title,content,category,Author} = req.body;
        let token = req.header('token');
        // console.log(token);

        if(token) {
            let decoded = jwt.decode(token, {complete:true});
            let id = decoded.payload.id;
            // console.log('ini dari jwt add',decoded.payload);    

            ModelUser.find()
            .then(results => {
                for (let i = 0; i < results.length; i++) {
                    console.log(results[i]._id == id)
                    if (results[i]._id == id) {
                        // res.status(200).json({
                        //     message: 'Jwt decode user successful !',
                        //     user: results[i]
                        // })

                        let newObj = {
                            Author: id,
                            title,
                            content,
                            category
                        }
                        console.log(newObj);
                
                        let newArticle = new ModelArticle(newObj);
                
                        newArticle.save((err,result) => {
                            if(err) {
                                res.status(400).json({
                                    message: 'Error: Bad request: save new articles'
                                })
                            } else {
                                res.status(201).json({
                                    message: 'Add new articles successful!',
                                    article: result
                                })
                            }
                        })    

                    }    
                }


            })
            .catch(error => {
                res.status(400).json({
                    message: 'Bad request: Get all  users error !',
                    error
                })    
            })
            
        }

    }


    static updateData (req,res) {

        let { articleid,title,content,category } = req.body
        let token = req.header('token');
        // console.log(token)

        if (token) {
            let decoded = jwt.decode(token, {complete:true});
            let id = decoded.payload.id;
            // console.log('ini dari jwt add',decoded.payload);    

            ModelUser.find()
            .then(results => {
                for (let i = 0; i < results.length; i++) {
                    // console.log('=========',results[i]._id, id)
                    
                    if (results[i]._id == id) {
                        // console.log('masuk user bener')

                        let newObj = {
                            title,
                            content,
                            category
                        }
                        // console.log(newObj)

                        ModelArticle.findOneAndUpdate({_id: ObjectId(articleid)}, newObj, function(err,result) {
                            if(err) {
                                res.status(400).json({
                                    message: 'Error: Bad request update article'
                                })
                            } else {
                                res.status(200).json({
                                    message: 'Update article successful!',
                                    article_before: result
                                })
                            }
                        })
            
                    }    
                }


            })
   
        }

    }


    static deleteData (req,res) {

        let { articleid } = req.body
        let token = req.header('token');
        // console.log(token)

        if (token) {
            let decoded = jwt.decode(token, {complete:true});
            let id = decoded.payload.id;
            // console.log('ini dari jwt add',decoded.payload);    

            ModelUser.find()
            .then(results => {
                for (let i = 0; i < results.length; i++) {
                    // console.log('=========',results[i]._id, id)
                    
                    if (results[i]._id == id) {
                        // console.log('masuk user bener')

                        ModelArticle.deleteOne({_id: ObjectId(articleid)}, function(err,result) {
                            if(err) {
                                res.status(400).json({
                                    message: 'Error: Bad request delete article'
                                })
                            } else {
                                res.status(200).json({
                                    message: 'Delete article successful!',
                                    article_before: result
                                })
                            }
                        })
            
                    }    
                }


            })
   
        }

    
    }






    
}


module.exports = ControllerUser;