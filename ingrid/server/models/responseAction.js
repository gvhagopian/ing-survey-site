'use strict'

module.exports = (sequelize, DataTypes) => {
    const responseAction = sequelize.define('responseAction', {
        time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    responseAction.associate = function (models) {
        responseAction.belongsTo(models.surveyResponse, {
            foreignKey: 'responseId',
            onDelete: 'CASCADE'
        })
    }
    return responseAction
};