
const Sequelize = require('sequelize');
const db = require('../../database');
module.exports = db.define( 'text',{
    textId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: Sequelize.STRING(20) },
    title: { type: Sequelize.STRING(255)  },
    content: { type: Sequelize.STRING(1000) },
}, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
});
