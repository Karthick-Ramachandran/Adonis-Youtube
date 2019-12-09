"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.group(() => {
  Route.get("/login", "LoginController.show");
  Route.post("/login", "LoginController.login");
  Route.get("/register", "RegisterController.show");
  Route.post("/register", "RegisterController.register");
}).middleware("guest");

Route.get("/home", ({ view }) => {
  return view.render("home");
}).middleware("auth");

Route.post("/logout", async ({ auth, session, response }) => {
  await auth.logout();
  session.flash({ message: "You're logged out, Come back soon" });
  return response.redirect("/login");
});

Route.get("*", ({ view }) => {
  return view.render("404");
});
