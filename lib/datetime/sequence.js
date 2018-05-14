/**
 * Created by i99208 on 2016. 12. 21..
 */

//process.env.NODE_CONFIG_DIR='../../config';
const config = require('config');

const getSequence = ()=>{
    let curHour  = (new Date()).getHours();
    let interval = getInterval();
    let fromHour = parseInt( curHour / interval )
    return fromHour ;
}

const getInterval = ()=>{
    return parseInt( 24 / config.get('contents.photo.timeTable.div') );
}

//console.log( getSequence() );

module.exports.get = getSequence;

