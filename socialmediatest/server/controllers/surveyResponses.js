const surveyResponse = require('../models').surveyResponse

module.exports = {
    create(req, res) {
        return surveyResponse
            .create({
                title: req.body.title
            })
            .then(surveyResponse => res.status(201).send(surveyResponse))
            .catch(error => res.status(400).send(error))
    }
}