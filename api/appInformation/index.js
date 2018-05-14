/**
 * Created by 유광식 on 2017-01-25.
 */


const express = require('express');
const router = express.Router();
const ctrl = require('./appInformation.controller');


router.get( '/install/:os' , (req, res)=> res.redirect( require('config').get( `app-install.${req.params.os}` ) ) )

router.get( '/execute' , (req, res) => res.redirect( 'ifriendspet://join' ) )



//appInformation 등록
router.post('/' , ctrl.createAppInformation);

//appInformation 상세조회
router.get('/:appInformationId', ctrl.findAppInformation);


//appInformation 조회 : filter OS : Android/ios order:createAt, DESC
router.get('/', ctrl.retrieveAppInformation);








module.exports = router;
