/**
 * Created by CYK on 2016-12-07.
 */

const token =  require('../../lib/token');
const error =  require('../../lib/error');
const logger =  require('../../lib/logger');

const code =  require('../../config/commonCode.json');



const isAuthenticate = (req, res, next)=>{

    // check header or url parameters or post parameters for token
    var accessToken = req.body.accessToken || req.query.accessToken || req.params.accessToken || req.headers['x-access-token'];

    logger.debug('accessToken=[%s]',accessToken);

    // decode token
    if (accessToken) {

        token('auth').verify( accessToken, (err, decoded)=> {
            if (err) {
                return res.json(error(504));
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });w

    } else {

        // if there is no token
        // return an error
        return res.status(403).json(error(505));
    }

}


const isUserAuthenticate = (req, res, next)=>{
    // check header or url parameters or post parameters for token
    var accessToken = req.body.accessToken || req.query.accessToken || req.params.accessToken || req.headers['x-access-token'];

    logger.debug('accessToken=[%s]',accessToken);

    // decode token
    if (accessToken) {

        token('auth').verify( accessToken, (err, decoded)=> {
            if (err) {
                return res.json(error(504));
            } else {

                if( decoded.auth < code.AccessToken.user ){
                    return res.json( error(506) );
                }
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).json(error(505));
    }
}


/**
 *  로그인 토큰을 생성한다.
 *
 *
 * @param id
 * @param auth
 * @param exp
 * @returns {*}
 */
const createUserToken = ( userId ) => {
    return { accessToken: token('auth').generate( {userId: userId, auth: code.AccessToken.auth.user} ) };
}

exports.createUserToken = createUserToken;
exports.isAuthenticate = isAuthenticate;
exports.isUserAuthenticate = isUserAuthenticate;