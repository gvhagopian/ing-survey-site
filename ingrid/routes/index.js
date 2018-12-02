'use strict'
var express = require('express')
var router = express.Router()
var model = require('../server/models')
/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
})

router.get('/Page1', (req, res) => {
    model.surveyRespondent
        .findOrCreate({
            where: {
                userAgent: req.headers['user-agent'],
                ipAddress: req.connection.remoteAddress,
                cookie: req.sessionID
            }
        })
        .spread((surveyRespondent, created) => {
            req.session.respID = surveyRespondent.id
            res.render('Page1', { title: 'Page 1' })
        })
        .catch(error => {
            res.status(400).send(error)
        })
})


router.post('/Page1', (req, res) => {
    model.surveyResponse
        .create({
            respondentId: req.session.respID,
            form: 'Page1',
            comment: req.body.comment,
            identifier: req.body.identifier,
            submitButton: req.body.button
        })
        .then(surveyResponse => {
            res.render('Page1', { answer: req.body.srvResp })
        })
        .catch(error => res.status(400).send(error))
})


router.get('/Page2', (req, res) => {
    model.surveyRespondent
        .findOrCreate({
            where: {
                userAgent: req.headers['user-agent'],
                ipAddress: req.connection.remoteAddress,
                cookie: req.sessionID
            }
        })
        .spread((surveyRespondent, created) => {
            req.session.respID = surveyRespondent.id
            res.render('Page2', { title: 'Page 2' })
        })
        .catch(error => {
            res.status(400).send(error)
        })
})


router.post('/Page2', (req, res) => {
    model.surveyResponse
        .create({
            respondentId: req.session.respID,
            form: 'Page2',
            comment: req.body.comment,
            identifier: req.body.identifier,
            submitButton: req.body.button
        })
        .then(surveyResponse => {
            res.render('Page2', { title: 'Page 2' })
        })
        .catch(error => res.status(400).send(error))
})

module.exports['default'] = router