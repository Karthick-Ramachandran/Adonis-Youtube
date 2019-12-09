"use strict";

const { validate } = use("Validator");
const User = use("App/Models/User");
class RegisterController {
  async show({ view }) {
    return view.render("auth.register");
  }
  async register({ request, response, session, auth }) {
    const body = request.all();
    const rules = {
      email: "required|email|unique:users",
      username: "required|unique:users",
      password: "required|min:5"
    };
    const messages = {
      "email.required": "Email is required",
      "username.required": "Username is required",
      "password.required": "Password is required",
      "email.unique": "Email already registered",
      "email.email": "Email should be a valid one",
      "username.unique": "Username is already used",
      "password.min": "Password should have at least 5 characters"
    };

    const validation = await validate(body, rules, messages);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }
    const newUser = await new User();
    newUser.username = body.username;
    newUser.email = body.email;
    newUser.password = body.password;
    await newUser.save();
    await auth.attempt(newUser.email, body.password);
    session.flash({ message: "Registered and Logged in" });
    return response.redirect("/home");
  }
}

module.exports = RegisterController;
