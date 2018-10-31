'use strict'

module.exports = (sequelize, DataTypes) => {
    const surveyRespondent = sequelize.define('surveyRespondent', {
        userAgent: DataTypes.STRING
    }, {})
    surveyRespondent.associate = function (models) {
        surveyRespondent.hasMany(models.surveyResponse, {
            foreignKey: 'responseId',
            as: 'todoItems',
        })
    }
    return surveyRespondent
};