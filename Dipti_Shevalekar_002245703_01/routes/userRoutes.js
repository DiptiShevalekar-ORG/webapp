const express = require('express')
const router = express.Router()


const userController = require('../controllers/userController')
const authMiddleware = require('../Middleware/authMiddleware')
router.post('/', userController.userMethod)
router.get('/self', authMiddleware.getAuthorization, userController.authenticationFound)
router.put('/self', authMiddleware.getAuthorization, userController.updateUserControllerMethod)
router.all('/',userController.methodNotAllowed)
router.all('/self', userController.methodNotAllowed)
module.exports = router
