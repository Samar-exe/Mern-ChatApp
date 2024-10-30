const router = require('express').Router()
const {createChats,findUserChats,findChat} = require('../Controllers/chatController')

router.post('/',createChats)
router.get('/:userId',findUserChats)
router.get('/find/:firstId/:secondId',findChat)

module.exports = router;