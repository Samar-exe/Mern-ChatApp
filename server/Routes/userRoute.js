const router = require('express').Router()
const {registerUser,loginUser,findUser, getAllUsers} = require('../Controllers/userController')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/find/:userId',findUser)
router.get('/',getAllUsers)

module.exports = router;    