'use strict'

module.exports = (sequelize, DataTypes) => {
    const surveyResponse = sequelize.define('surveyResponse', {
        form: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        identifier: {
            type: DataTypes.STRING,
            allowNull: false
        },
        submitButton: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    surveyResponse.associate = function (models) {
        surveyResponse.belongsTo(models.surveyRespondent, {
            foreignKey: 'respondentId',
            onDelete: 'CASCADE'
        })
    }
    return surveyResponse
};