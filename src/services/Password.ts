import * as jwt from 'jsonwebtoken';

import config from '../config';


/**
 * Encodes userId (Subject) and IssuedAtTime w/ the secret
 * @param {User model} user
 */
export function generateToken(user) {
   return jwt.sign({ sub: user.id, iat: Date.now() }, config.secret);
}


// export function decodeToken(token) {
//    return decode(token, config.secret);
// }

export function verifyToken(token) {
   return jwt.verify(token, config.secret);
}
