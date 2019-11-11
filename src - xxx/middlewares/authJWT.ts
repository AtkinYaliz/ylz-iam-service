import * as passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import config from "../config";
import UserRepository from "../repositories/user/UserRepository";

// Options for the strategy
const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

/**
 * Verify function for the strategy
 * @param payload Decoded version of jwt token { sub: user.id, iat: Date.now() }
 * @param done This callback is supplied by passport. Passport assigns user model to req.user
 * @returns void
 */
async function verifyFunction(payload, done) {
  // Verify if the user ID in the payload exists in our DB
  // If it is valid: call 'done' w/ a user object
  // Otherwise, call 'done' w/ a false
  try {
    const user = await new UserRepository().get({ id: payload.sub });

    return user ? done(null, { id: user.id }) : done(null, false);
  } catch (err) {
    return done(err);
  }
}

// Create the strategy
const jwtStrategy = new JWTStrategy(strategyOptions, verifyFunction);

// Tell passport to use this strategy
passport.use(jwtStrategy);

/**
 * After successful authentication, Passport will establish a persistent login session.
 * This is useful for the common scenario of users accessing a web application via a browser.
 * However, in some cases, session support is not necessary.
 * For example, API servers typically require credentials to be supplied with each request.
 * When this is the case, session support can be safely disabled by setting the session option to false.
 */
export default passport.authenticate("jwt", { session: false, failWithError: true });
