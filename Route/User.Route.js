const express = require('express');
const router = express.Router()
const userControler = require('../Controler/User.controler');


router.route("/")
.get(userControler.getArtical)
.patch(userControler.loginUser)


module.exports = router