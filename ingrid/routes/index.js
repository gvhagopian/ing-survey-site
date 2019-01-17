'use strict'
var express = require('express')
var router = express.Router()
var JSONC = require('../public/js/JSONC.js')
var model = require('../server/models')

var imgGroup = {
    name: 'group',
    viewbox: '0 0 85.988 85.987',
    style: 'enable-background:new 0 0 85.988 85.987;',
    data: `M77.993,30.884c-2.692,0-4.878,2.185-4.878,4.868c0,2.685,2.186,4.867,4.878,4.867 c2.683,0,4.867-2.183,4.867-4.867C82.86,33.069,80.675,30.884,77.993,30.884z M8.005,30.884c-2.692,0-4.878,2.185-4.878,4.868 c0,2.685,2.186,4.867,4.878,4.867c2.685,0,4.87-2.183,4.87-4.867C12.875,33.069,10.69,30.884,8.005,30.884z M63.504,22.03 c-3.997,0-7.239,3.25-7.239,7.25c0,3.992,3.242,7.236,7.239,7.236c3.998,0,7.25-3.244,7.25-7.236 C70.754,25.284,67.502,22.03,63.504,22.03z M85.988,66.088h-8.254V50.896c0-2.61-0.767-5.033-1.999-7.146 c0.726-0.212,1.471-0.363,2.258-0.363c4.401,0,7.995,3.594,7.995,8.006V66.088z M22.483,22.03c-4,0-7.25,3.25-7.25,7.25 c0,3.992,3.25,7.236,7.25,7.236c3.987,0,7.237-3.244,7.237-7.236C29.72,25.284,26.471,22.03,22.483,22.03z M8.005,43.387 c0.787,0,1.522,0.15,2.25,0.363c-1.245,2.113-1.999,4.536-1.999,7.146v15.192H0V51.393C0,46.98,3.596,43.387,8.005,43.387z M42.986,7.555c-5.9,0-10.71,4.805-10.71,10.711c0,5.905,4.805,10.716,10.71,10.716c5.906,0,10.717-4.811,10.717-10.716 C53.708,12.359,48.892,7.555,42.986,7.555z M75.083,71.742H62.438V48.627c0-3.179-0.839-6.136-2.195-8.787 c1.035-0.306,2.123-0.523,3.262-0.523c6.38,0,11.578,5.188,11.578,11.579V71.742z M23.537,48.627v23.115H10.908V50.896 c0-6.385,5.191-11.579,11.581-11.579c1.139,0,2.216,0.217,3.249,0.523C24.381,42.491,23.537,45.448,23.537,48.627z M26.188,78.433 h33.598V48.627c0-9.264-7.539-16.798-16.801-16.798c-9.269,0-16.797,7.534-16.797,16.798V78.433z`
}

var imgUserOld = {
    name: 'user',
    viewbox: '0 0 549.907 549.908',
    style: 'enable-background:new 0 0 549.907 549.908;',
    data: `M110.534,220.962c0-49.027,39.741-88.768,88.768-88.768s88.768,39.741,88.768,88.768c0,49.026-39.741,88.768-88.768,88.768 S110.534,269.989,110.534,220.962z M236.968,315.783h-75.327c-62.668,0-113.655,50.986-113.655,113.646v92.143l0.236,1.437 l6.36,1.985c59.796,18.679,111.764,24.914,154.531,24.914c83.531,0,131.94-23.82,134.938-25.333l5.94-3.015l0.626,0.006v-92.137 C350.617,366.769,299.631,315.783,236.968,315.783z M350.617,177.533c49.024,0,88.768-39.741,88.768-88.768 C439.385,39.741,399.642,0,350.617,0c-49.023,0-88.768,39.741-88.768,88.765C261.85,137.792,301.594,177.533,350.617,177.533z M388.28,183.585h-75.326c-1.797,0-3.547,0.189-5.32,0.275c6.81,14.295,10.74,30.225,10.74,47.094 c0,31.129-13.057,59.205-33.922,79.23c48.823,14.523,86.144,55.986,94.638,107.08c71.999-3.145,113.504-23.49,116.265-24.885 l5.94-3.015l0.626,0.012v-92.137C501.933,234.575,450.946,183.585,388.28,183.585z`
}

var imgUser = {
    name: 'user',
    viewbox: '0 0 1291.116 1638.771',
    style: 'enable-background:new 0 0 1291.116 1638.771;',
    data: `M959.98,769.382C873.16,846.125,770.543,880.92,645.557,880.92s-228.083-35.757-314.903-112.5 c-136.539,44.711-299.819,158.492-300,357.211l-0.48,370.673c-0.089,68.183,54.892,123.081,123.077,123.081h984.614 c68.185,0,123.077-54.894,123.077-123.081v-369.23c0-170.673-135.669-314.558-300.961-357.692L959.98,769.382L959.98,769.382z M1014.788,388.615c0,203.92-165.31,369.23-369.23,369.23s-369.23-165.311-369.23-369.23 s165.31-369.23,369.23-369.23S1014.788,184.696,1014.788,388.615z`
}


var messages = [
    "Just learnt that my cancer tumor didn’t regrow. So thrilled.",
    "Just learnt that my sister’s cancer tumor didn’t regrow. So thrilled.",
    "Just learnt that my cancer tumor has regrown. So devastated.",
    "Just learnt that my sister’s cancer tumor has regrown. So devastated.",
    "I became a mother today. So thrilled.",
    "My sister became a mother today. So thrilled.",
    "I lost my baby today. So devastated.",
    "My sister lost her baby today. So devastated."
]

var pagestyles = [
    {
        images: true,
        buttons: [
            { name: "Submit Publicly", img: imgGroup, id: "submit-publicly-btn" },
            { name: "Submit Privately", img: imgUser, id: "submit-privately-btn" }]
    }, {
        images: false,
        buttons: [
            { name: "Submit", id: "single-submit-btn" }]
    }
]

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
})


router.get('/\\d+', (req, res) => {

    var page = req.url.substr(1)
    var pNum = parseInt(page, 10) - 1;

    if (pNum < 0 || pNum >= messages.length * pagestyles.length) {
        res.status(404).send("404 - Page does not exist")
        return
    }
    var styleNum = Math.floor(pNum / messages.length)
    var style = pagestyles[styleNum]
    var messageNum = pNum % messages.length
    var message = messages[messageNum]
    
    model.surveyRespondent
        .findOrCreate({
            where: {
                userAgent: req.headers['user-agent'],
                ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                cookie: req.sessionID
            }
        })
        .spread((surveyRespondent, created) => {
            var prevImg

            if (style.images) {
                prevImg = imgGroup
            }

            req.session.respID = surveyRespondent.id
            res.render('survey-form', {
                title: "Page " + page,
                surveyquery: message,
                previmg: prevImg,
                buttons: style.buttons
            })
        })
        .catch(error => {
            res.status(400).send(error)
        })
})


router.post('/\\d+', (req, res) => {

    var page = req.url.substr(1)
    var pNum = parseInt(page, 10) - 1;

    if (pNum < 0 || pNum >= messages.length * pagestyles.length) {
        res.status(404).send("404 - Page does not exist")
        return
    }

    var styleNum = Math.floor(pNum / messages.length)
    var style = pagestyles[styleNum]
    var messageNum = pNum % messages.length
    var message = messages[messageNum]
    var historyList

    model.surveyResponse
        .create({
            respondentId: req.session.respID,
            form: styleNum,
            message: messageNum,
            comment: req.body.comment,
            identifier: req.body.identifier,
            submitButton: req.body.button
        })
        .then(surveyResponse => {

            if (req.body.inputHistory) {
                console.log("history: " + req.body.inputHistory)
                historyList = JSONC.unpack(req.body.inputHistory)
                console.log("there are " + historyList.length + " items")
                for (let h of historyList) {
                    console.log("action: " + h.action + " at " + h.time)
                    h.responseId = surveyResponse.id
                }
                model.responseAction.bulkCreate(historyList)
            }

            var img
            var prevImg

            if (style.images) {
                prevImg = imgGroup
                if (req.body.button === 'Submit Publicly') img = imgGroup
                else img = imgUser
            }

            res.render('survey-form',
                {
                    title: "Page " + page,
                    surveyquery: message,
                    previmg: prevImg,
                    buttons: style.buttons,
                    comment: { text: req.body.comment, button: req.body.button },
                    img: img,
                    identifier: surveyResponse.identifier
                })
        })
        .catch(error => res.status(400).send(error))
})

module.exports['default'] = router