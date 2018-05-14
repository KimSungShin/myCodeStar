
const sequelize = require('../../database');
const TRAN      = require('../../database/transaction');
const code      = require('../../config/commonCode.json');
const logger    = require('../../lib/logger');
const token     = require('../../lib/token');
const error     = require('../../lib/error');
const BizError  = require('../../lib/error/bizError');

const History   = require('../../database/model/history');


const create = ( param, cb ) =>{
    const _trxStart = (tx) => {
        return createTx(param,tx);
    }
    const _trxSuccess = (result) => {
        cb(null, result );
    }
    const _trxError = (err) => {
        logger.error(err);
        if( err instanceof BizError ){
            cb( err.getError(),null);
        }
        else {
            cb(error(500), null);
        }
    }
    sequelize
        .transaction( TRAN, _trxStart )
        .then(_trxSuccess)
        .catch(_trxError)
    ;
}

const createTx = (param,transaction)=>{
    let options = {transaction}
    return History.create(param,options)
}

module.exports = {
    create,
}