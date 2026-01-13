This is a simple Task Manager Web Application built using HTML, CSS, Bootstrap 5, JavaScript, and jQuery.
It allows users to register, login, logout, and manage tasks (add, edit, delete) without reloading the page.
All data is stored in the browser using LocalStorage.

**Clone/download the project.

Open folder → right-click index.html → Open with Live Server.

Register a new account.

Login.

Add, edit, delete tasks.

Logout to test session removal.**

**1. Project Files
**
index.html → Main file. Loads other pages dynamically in the #content div.

login.html → Login form page, loaded dynamically.

register.html → Registration form page, loaded dynamically.

dashboard.html → Dashboard page, shows user tasks, allows add/edit/delete tasks.

script.js → Contains all JavaScript/jQuery logic.

style.css → Contains custom CSS for forms, tables, and buttons.

Bootstrap 5 → Used for responsive design.

**2. Application Flow
**
Open index.html.

Check LocalStorage for a logged-in user.

If found → load dashboard.

If not → load login page.

Navigation between login and register pages happens without page reload using jQuery .load().

After login → dashboard loads tasks for the current user.

Users can add, edit, delete tasks.

Logout → session ends, login page loads.

**3. Important Methods, Functions, and What They Do
**
🔹 LocalStorage Methods

localStorage.getItem(key)

Reads data from LocalStorage.

Used to check logged-in user, users list, and tasks.

Example: localStorage.getItem("loggedInUser")

localStorage.setItem(key, value)

Saves data in LocalStorage.

Used to store registered users, tasks, and logged-in user.

Example: localStorage.setItem("tasks", JSON.stringify(tasks))

localStorage.removeItem(key)

Removes a key from LocalStorage.

Used for logout: localStorage.removeItem("loggedInUser")

**🔹 JSON Methods
**
JSON.parse(string)

Converts a JSON string from LocalStorage into a JavaScript object.

Used for reading users or tasks:
let users = JSON.parse(localStorage.getItem("users"))

JSON.stringify(object)

Converts a JavaScript object into a JSON string to save in LocalStorage.

Example: localStorage.setItem("tasks", JSON.stringify(tasks))

**🔹 Array Methods
**
Array.some()

Checks if any element in an array satisfies a condition. Returns true/false.

Used to check if username already exists during registration:
users.some(u => u.username === username)

Array.splice(index, 1)

Removes an element from an array at a given index.

Used to delete tasks: tasks[username].splice(index, 1)

Array.forEach()

Iterates over an array.

Used to display each task in the task table dynamically.

**🔹 jQuery Methods
**
.on("click", selector, function)

Attach click events, works even on dynamically loaded elements.

Used for login, register, logout, add/edit/delete tasks, and page navigation.

.load("page.html")

Loads HTML content into a container without reloading the page.

Used for dynamic page switching between login, register, and dashboard.

.attr(attribute)

Get or set attributes of HTML elements.

Used for toggling password visibility: target.attr("type", type)

.addClass() / .removeClass()

Dynamically add or remove CSS classes.

Used to show/hide error messages:
errorMsg.removeClass("d-none") → show
errorMsg.addClass("d-none") → hide

**🔹 String Methods
**
trim()

Removes whitespace from beginning and end of a string.

Used for input validation: $("#username").val().trim()

**🔹 Date Methods
**
new Date().toLocaleDateString() → returns current date

new Date().toLocaleTimeString() → returns current time

Used to store task creation and update time.

**4. Key Variables
**
loggedInUser → Stores current logged-in username.

users → Array of all registered users.

tasks → Object storing tasks for each user.

editIndex → Tracks which task is being edited. Null means no task is being edited.

**5. Functional Overview
🔹 Registration**

User clicks Register → prevent default reload.

Input validation: all fields required, passwords match, username must be unique.

Save user in LocalStorage.

Redirect to login page.

Show errors using #errorMsg if validation fails.

**🔹 Login
**
User clicks Login → prevent reload.

Check credentials from LocalStorage.

If valid → save loggedInUser and load dashboard.

If invalid → show error message.

**🔹 Logout
**
User clicks Logout.

Remove loggedInUser from LocalStorage.

Load login page.

**🔹 Dashboard
**
loadDashboard() → Load dashboard page, show username, call loadTasks().

loadTasks() → Load all tasks for the current user from LocalStorage, display in table with Edit/Delete buttons.

**🔹 Add Task
**
User enters task and clicks Submit.

If editIndex is null → create new task with date, time, updatedAt = "-".

Save task in LocalStorage.

Clear input and reload task table.

**🔹 Edit Task
**
Click Edit → load task text into input, store index in editIndex.

Change button text to "Update Task".

Update task text, updatedAt, reset editIndex, change button back to "Submit".

**🔹 Delete Task
**
Click Delete → remove task from array using splice().

Update LocalStorage.

Reload task table.

