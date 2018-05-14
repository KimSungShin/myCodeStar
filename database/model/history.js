
const Sequelize = require('sequelize');
const db = require('../../database');

module.exports = db.define( 'history',{

    id:          { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

    userId:      { type: Sequelize.STRING(20)   },
    method:      { type: Sequelize.STRING(20)   },
    contentType: { type: Sequelize.STRING(100)  },
    originalUrl: { type: Sequelize.STRING(2000) },
    baseUrl:     { type: Sequelize.STRING(2000) },
    query:       { type: Sequelize.STRING(2000) },
    params:      { type: Sequelize.STRING(2000) },
    body:        { type: Sequelize.STRING(2000) },
    decoded:     { type: Sequelize.STRING(2000) },
    model:       { type: Sequelize.STRING(20)   },
    modelId:     { type: Sequelize.STRING(100)  },

});
