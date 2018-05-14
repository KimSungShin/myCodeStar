/**
 * Created by 유광식 on 2017-01-25.
 */


const logger = require('../../lib/logger');
const paging = require('../../lib/paging');

const biz = require('./appInformation.biz');
const error =  require('../../lib/error');

const code      = require('../../config/commonCode.json');



const createAppInformation = (req, res) => {
    logger.debug('api/appInformation/ctrl.createAppInformation Call');
    logger.debug('req.body.os=%j', req.body.os);
    logger.debug('req.body.type=%j', req.body.type);
    logger.debug('req.body.title=%j', req.body.title);
    logger.debug('req.body.content=%j', req.body.content);

    if (!req.body.title){
        return res.json(error(100, '버전정보가 입력되지 않았습니다', '버전정보를 입력해 주세요') );
    }

    let text = {
        title: req.body.title,
        content: req.body.content,
        type : code.Text.type.appInfo
    };

    let appInformation = {
        os : req.body.os,
        type: req.body.type
    };
    biz.createAppInformation (text, appInformation, (error, results) => {
        if (error){
            return res.json(error);
        }
        else {
            return res.json(results)
        }
    })
};




const findAppInformation = (req, res) => {
    logger.debug('api/appInformation/ctrl.retrieveAppInformation Call');
    logger.debug('req.body.os=%j', req.params.appInformationId);

    let id = req.params.appInformationId;

    biz.findAppInformation(id, (error, results) => {
        if (error) {
            return res.json(error);
        }
        else {
            return res.json(results)
        }
    });

};





const retrieveAppInformation = (req, res) => {
    logger.debug('api/appInformation/ctrl.retrieveAppInformation Call');
    logger.debug('req.body.os=%j', req.query.os);

    let params = {
        os: req.query.os
    };

    biz.retrieveAppInformation(params, (error, results) => {
        if (error) {
            return res.json(error);
        }
        else {
            return res.json(results)
        }
    })

};


module.exports = {createAppInformation, retrieveAppInformation,findAppInformation};