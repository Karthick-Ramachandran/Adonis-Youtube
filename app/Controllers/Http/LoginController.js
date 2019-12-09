"use strict";
const { validate } = use("Validator");
class LoginController {
  async show({ view }) {
    return view.render("auth.login");
  }
  async login({ request, response, session, auth }) {
    const body = request.all();
    const rules = {
      email: "required|email",
      password: "required|min:5"
    };
    const messages = {
      "email.required": "Email is required",
      "password.required": "Password is required",
      "email.email": "Email should be a valid one"
    };

    const validation = await validate(body, rules, messages);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }

    await auth.attempt(body.email, body.password);
    session.flash({ message: "Logged in Successfully" });
    return response.redirect("/home");
  }
}

module.exports = LoginController;
