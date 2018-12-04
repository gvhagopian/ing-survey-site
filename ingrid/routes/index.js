'use strict'
var express = require('express')
var router = express.Router()
var model = require('../server/models')
/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
})

router.get('/1', (req, res) => {
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
            res.render('survey-form', { title: "Page 1", buttons: ["Submit Publicly", "Submit Privately"] })
        })
        .catch(error => {
            res.status(400).send(error)
        })
})


router.get('/2', (req, res) => {
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
            res.render('survey-form', { title: "Page 2", buttons: ["Submit"] })
        })
        .catch(error => {
            res.status(400).send(error)
        })
})


router.post('/1', (req, res) => {
    model.surveyResponse
        .create({
            respondentId: req.session.respID,
            form: 'Page1',
            comment: req.body.comment,
            identifier: req.body.identifier,
            submitButton: req.body.button
        })
        .then(surveyResponse => {
            res.render('survey-form',
                {
                    title: "Page 1",
                    buttons: ["Submit Publicly", "Submit Privately"],
                    comment: { text: req.body.comment, button: req.body.button },
                    identifier: surveyResponse.identifier
                })
        })
        .catch(error => res.status(400).send(error))
})

router.post('/2', (req, res) => {
    model.surveyResponse
        .create({
            respondentId: req.session.respID,
            form: 'Page2',
            comment: req.body.comment,
            identifier: req.body.identifier,
            submitButton: req.body.button
        })
        .then(surveyResponse => {
            res.render('survey-form',
                {
                    title: "Page 2",
                    buttons: ["Submit"],
                    comment: { text: req.body.comment, button: req.body.button },
                    identifier: surveyResponse.identifier
                })
        })
        .catch(error => res.status(400).send(error))
})

module.exports['default'] = router