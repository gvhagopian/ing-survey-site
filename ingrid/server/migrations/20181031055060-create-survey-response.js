'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('surveyResponses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            form: {
                type: Sequelize.STRING,
                allowNull: false
            },
            comment: {
                type: Sequelize.STRING,
                allowNull: false
            },
            identifier: {
                type: Sequelize.STRING,
                allowNull: false
            },
            submitButton: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            respondentId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'surveyRespondents',
                    key: 'id',
                    as: 'respondentId'
                }
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('surveyResponses');
    }
}