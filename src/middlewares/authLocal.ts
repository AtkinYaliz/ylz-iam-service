import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { UserRepository } from "../repositories/user/UserRepository";

// Options for the strategy
const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
};

/**
 * Verify function for the strategy
 * @param req First parameter will be 'req' when passReqToCallback: true
 * @param email
 * @param password
 * @param done This callback is supplied by passport. Passport assigns user model to req.user
 * @returns void
 */
async function verifyFunctionWithRequest(req, email, password, done) {
  // Verify this username and pasword from DB,
  // If they are valid: call 'done' w/ the user
  // Otherwise, call 'done' w/ false
  try {
    const user = await new UserRepository().getUser({ email, applicationId: req.body.applicationId });

    if (!user) {
      return done(null, false);
    }

    // @ts-ignore
    const isMatch = await user.authenticateUser(password);

    return isMatch ? done(null, user) : done(null, false);
  } catch (err) {
    return done(err);
  }
}

// Create the strategy
// @ts-ignore
const localStrategy = new LocalStrategy(strategyOptions, verifyFunctionWithRequest);

// Tell passport to use this strategy
passport.use(localStrategy);

/**
 * After successful authentication, Passport will establish a persistent login session.
 * This is useful for the common scenario of users accessing a web application via a browser.
 * However, in some cases, session support is not necessary.
 * For example, API servers typically require credentials to be supplied with each request.
 * When this is the case, session support can be safely disabled by setting the session option to false.
 */
export default passport.authenticate("local", { session: false, failWithError: true });
