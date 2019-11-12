// import * as jwt from "jsonwebtoken";

// import config from "../config";

// /**
//  * Synchronously sign {userId and IssuedAtTime} payload into a JSON Web Token string payload
//  * @param {User model} user
//  */
// export function generateToken(user) {
//   return jwt.sign(
//     {
//       sub: user.id,
//       iat: Date.now()
//     },
//     config.secret
//   );
// }

// // export function decodeToken(token) {
// //    return decode(token, config.secret);
// // }

// /**
//  * Synchronously verify given token using a secret.
//  * @param token The token to be validated
//  */
// export function verifyToken(token) {
//   return jwt.verify(token, config.secret);
// }
