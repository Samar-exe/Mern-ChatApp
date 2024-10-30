const router = require('express').Router()
const {createMessage,getMessage} = require('../Controllers/messageController')

router.post('/',createMessage)
router.get('/:chatId',getMessage)

 module.exports = router