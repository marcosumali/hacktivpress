var express = require('express');
var ControllerUser = require('../controllers/c_users')

var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router
  .get('/', ControllerUser.getUsers)
  .post('/register', ControllerUser.register)
  .post('/login', ControllerUser.login)




module.exports = router;
