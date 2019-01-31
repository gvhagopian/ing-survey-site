'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('surveyRespondents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userAgent: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: 'uniqueRespondent'
            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: 'uniqueRespondent'
            },
            cookie: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: 'uniqueRespondent'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('surveyRespondents')
    }
}