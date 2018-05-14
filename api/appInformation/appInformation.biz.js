/**
 * Created by 유광식 on 2017-01-25.
 */

const sequelize = require('../../database');
const TRAN = require('../../database/transaction');
const logger = require('../../lib/logger');
const token  = require('../../lib/token');
const error =  require('../../lib/error');
const Text = require('../../database/model/text');
const AppInformation = require('../../database/model/appInformation');



const createAppInformation = (text, appInformation, cb) => {
    const _trxStart = (tx) => {
        return createAppInformationTX ( text, appInformation,  tx );
    };
    const _trxSuccess = (result) => {
        //logger.debug(result);
        cb(null, result );
    };
    const _trxError = (err) => {
        logger.error(err);
        cb(error(500) , null);    };
    sequelize
        .transaction( TRAN, _trxStart )
        .then(_trxSuccess)
        .catch(_trxError);
};
const createAppInformationTX = (text, appInformation, tx) => {
    logger.debug('Biz.createAppInformation Call');

    let result ={};
    let option = {
        transaction : tx
    };
    const _createText =() =>{
            return Text.create(text, option )
            .then(t => {
                result.text = t.dataValues;
            })
    };
    const _createAppInformation =() =>{
        appInformation.textId = result.text.textId;
        return AppInformation.create(appInformation, option)
            .then(appInfo => {
                result.appInformation = appInfo.dataValues;
            })
    };
    const _makeResult = () =>{
        return result;
    };
    return _createText()
        .then (_createAppInformation)
        .then (_makeResult)
};





const findAppInformation = (id, cb) => {
    const _trxStart = (tx) => {
        return findAppInformationTX ( id,  tx );
    };
    const _trxSuccess = (result) => {
        //logger.debug(result);
        cb(null, result );
    };
    const _trxError = (err) => {
        logger.error(err);
        cb(error(500) , null);    };
    sequelize
        .transaction( TRAN, _trxStart )
        .then(_trxSuccess)
        .catch(_trxError);
};
const findAppInformationTX = (id, tx) => {
    logger.debug('Biz.findAppInformation Call');

    // let result ={};

    const _retrieveAppInformation = () => {
        AppInformation.belongsTo(Text, {foreignKey: 'textId', targetKey: 'textId'});

        let options = {
            include : [
                {model : Text}
                ,            ],
            where :{appInformationId: id},
        };
        return AppInformation.findAll(options);

    };
    const _makeResults = (result) => {
        return result
    };
    return _retrieveAppInformation()
        .then(_makeResults);
};





const retrieveAppInformation = (params, cb) => {
    const _trxStart = (tx) => {
        return retrieveAppInformationTX ( params,  tx );
    };
    const _trxSuccess = (result) => {
        //logger.debug(result);
        cb(null, result );
    };
    const _trxError = (err) => {
        logger.error(err);
        cb(error(500) , null);    };
    sequelize
        .transaction( TRAN, _trxStart )
        .then(_trxSuccess)
        .catch(_trxError);
};
const retrieveAppInformationTX = (params,tx) => {
    logger.debug('Biz.retrieveAppInformation Call');

    let result = []

    const _retrieveAppInformation = () => {
        AppInformation.belongsTo(Text, {foreignKey: 'textId', targetKey: 'textId'});

        let options = {
            include : [
                {model : Text}
,            ],
            where :{},
            order: [['createdAt', 'DESC']],
        };
        if (params.os) {
            options.where.os = params.os;
        }
        return AppInformation.findAll(options);

    };
    const _makeResults = (result) => {
        return {data:result}
    };
    return _retrieveAppInformation()
        .then(_makeResults);
};


module.exports = {createAppInformation, findAppInformation, retrieveAppInformation};