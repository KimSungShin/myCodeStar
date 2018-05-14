
const config = require('config');
const path   = require('path');
const paging = require('../../lib/paging');
const error  = require('../../lib/error');
const logger = require('../../lib/logger');
const code   = require('../../config/commonCode.json');
const token  = require('../../lib/token');


const biz = require('./history.biz');

const API_NAME = 'history'

const init = (req,res,next)=>{
    const METHOD_NAME = 'init' ;
    logger.info(`api/${API_NAME}.controller ${METHOD_NAME} CALL !!!` );
    req[API_NAME] = {};
    next();
}

const initId = (req,res,next)=>{
    const METHOD_NAME = 'initId' ;
    logger.info(`api/${API_NAME}.controller ${METHOD_NAME} req.params.id : %s`, req.params.id );
    req[API_NAME] = {suggestId:req.params.id};
    next();
}

const create = (req,res,next)=> {

    var accessToken = req.body.accessToken || req.query.accessToken || req.params.accessToken || req.headers['x-access-token'];

    logger.debug('api/history.controller create accessToken=[%s]', accessToken);

    // 토큰이 유효하지 않으면 로깅을 하지 않음
    if (accessToken) {
        token('auth').verify( accessToken, (err, decoded)=> {
            if (!err) {
                req.decoded = decoded
                createHistory(req,decoded);
            }
        })

    }
    next();
}

const createHistory = (req, decoded)=>{

    let values={};

    if( req.method ){
        values.method = req.method;
    }

    if( req.originalUrl ){
        values.originalUrl = req.originalUrl;

        values.model = null;
        values.modelId = null;

        if( req.originalUrl.split('/')[1] ){
            values.model   = req.originalUrl.split('/')[1].split('?')[0];
        }

        if( req.originalUrl.split('/')[2] ){
            values.modelId = req.originalUrl.split('/')[2].split('?')[0];
        }
    }

    if( req.baseUrl ){
        values.baseUrl = req.baseUrl;
    }

    if( req.params ){
        values.params = JSON.stringify( req.params );
    }

    if( req.query ){
        values.query = JSON.stringify( req.query );
    }

    if( req.body ){
        values.body = JSON.stringify( req.body );
    }

    if( decoded ){
        values.userId  = decoded.userId;
        values.decoded = JSON.stringify( decoded );
    }

    if( req.headers['content-type'] ){
        values.contentType =  req.headers['content-type'];
    }


    biz.create( values, (err ,results) => {
        if(err){
            logger.error(err);
        }
        else {
            //logger.info(results);
        }
    });
}


module.exports = {
    init,
    initId,
    create,
}
