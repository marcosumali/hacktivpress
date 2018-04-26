var express = require('express');
var ControllerArticle = require('../controllers/c_articles')

var router = express.Router();


router
  .get('/', ControllerArticle.getArticles)
  .post('/createData', ControllerArticle.createData)
  .post('/byCategory', ControllerArticle.getByCategory)
  .post('/byAuthor', ControllerArticle.getByAuthor)
  .put('/update', ControllerArticle.updateData)
  .delete('/delete', ControllerArticle.deleteData)



module.exports = router;
