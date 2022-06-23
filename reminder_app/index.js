const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");

// Routes start here

// Case 2: User goes to localhost:3001/reminder  --> show a list of reminders
app.get("/reminders", reminderController.list);

// Case 3: User goes to localhost:3001/reminder/new  --> show a create a reminder page
app.get("/reminder/new", reminderController.new);

// Case 4: User sends new reminder data to us -->
app.post("/reminder/", reminderController.create);

// Case 5: User wants to SEE an indivisual reminder
app.get("/reminder/:id", reminderController.listOne);

// Case 6: User wants to EDIT an individual reminder
app.get("/reminder/:id/edit", reminderController.edit);

// Case 7: User clicks the UPDATE BUTTON from case 6, expect their reminder to be updated
app.post("/reminder/update/:id", reminderController.update);

// Case 8: User clicks the DELETE BUTTON and we expect the reminder to be deleted
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
