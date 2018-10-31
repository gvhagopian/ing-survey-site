'use strict'
var express = require('express')
var router = express.Router()


/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
})

router.get('/Page1', (req, res) => {
    res.render('Page1', { title: 'Page 1' })
})


router.post('/Page1', (req, res) => {
    res.render('Page1', {answer: req.body.srvResp})
})

router.get('/Page2', (req, res) => {
    res.render('Page2', { title: 'Page 2' })
})

module.exports['default'] = router