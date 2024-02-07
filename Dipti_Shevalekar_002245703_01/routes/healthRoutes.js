const express = require('express')
const router = express.Router()

const healthController = require('../controllers/healthController')

// router.get('/', healthController.getConnection)
router.all('/', healthController.methodAllowed)


module.exports = router
