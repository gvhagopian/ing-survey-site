'use strict'

module.exports = (sequelize, DataTypes) => {
    const surveyRespondent = sequelize.define('surveyRespondent', {
        userAgent: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'uniqueRespondent'
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'uniqueRespondent'
        },
        cookie: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'uniqueRespondent'
        }
    })

    surveyRespondent.associate = (models) => {
        surveyRespondent.hasMany(models.surveyResponse, {
            foreignKey: 'respondentId',
            as: 'surveyResponses'
        })
    }
    return surveyRespondent
};