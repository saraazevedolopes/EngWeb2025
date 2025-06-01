const express = require('express');
const router = express.Router();
const Item = require('../controllers/item');
const Config = require('../controllers/config');
const auth = require('../auth/auth');
var multer = require('multer')
var jsonfile = require('jsonfile');
var fs = require('fs');
const AdmZip = require('adm-zip');
const path = require('path');
const mime = require('mime-types');

const sip = require('./../oais/sip')
const aip = require('./../oais/aip')
const dip = require('./../oais/dip')

var upload = multer({dest : 'uploads'})
const Auth = require('../auth/auth')

router.get('/whoami',Auth.none, (req,res) => {

  if (req.user)
    res.status(200).redirect(`/utilizadores/${req.user._id}`)
  else
    res.status(200).send(req.user)

})

module.exports = router;
