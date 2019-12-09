"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Guest {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ session, auth, response }, next) {
    try {
      await auth.check();
      session.flash({ message: "You are already logged in" });
      return response.redirect("/home");
    } catch {
      await next();
    }
  }
}

module.exports = Guest;
