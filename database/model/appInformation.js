/**
 * Created by 유광식 on 2017-01-25.
 */

const Sequelize = require('sequelize');
const db = require('../../database');

module.exports = db.define( 'appInformation', {

    appInformationId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    os: { type: Sequelize.STRING(20)  },
    type: { type: Sequelize.STRING(20)  },
    textId: { type: Sequelize.INTEGER, },
},{
    paranoid: true
});
