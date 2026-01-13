⭐ Task Manager Web Application

A simple Task Manager Web Application built using HTML, CSS, Bootstrap 5, JavaScript, and jQuery.
It allows users to register, login, logout, and manage tasks (add, edit, delete) without page reload.
All data is stored in the browser using LocalStorage.

⭐ 1. How to Run the Project

➤ Clone or download the project
➤ Open the project folder
➤ Right-click index.html → Open with Live Server
➤ Register a new account
➤ Login
➤ Add / Edit / Delete tasks
➤ Logout to test session removal

⭐ 2. Project Files Structure

📁 index.html
→ Main file, loads other pages dynamically inside #content

📁 login.html
→ Login form page

📁 register.html
→ Registration form page

📁 dashboard.html
→ User dashboard and task management

📁 script.js
→ All JavaScript & jQuery logic

📁 style.css
→ Custom styling for forms, tables, and buttons

📁 Bootstrap 5
→ Responsive UI framework

⭐ 3. Application Flow

➊ Open index.html
➋ Check LocalStorage for logged-in user
➤ If user exists → load dashboard
➤ If not → load login page
➌ Switch pages using jQuery .load() (no reload)
➍ Login loads user-specific tasks
➎ Users can add, edit, delete tasks
➏ Logout clears session and redirects to login

⭐ 4. Important Methods & Usage
🔹 LocalStorage Methods

★ localStorage.getItem(key)
→ Reads data from LocalStorage
Example: localStorage.getItem("loggedInUser")

★ localStorage.setItem(key, value)
→ Saves data to LocalStorage
Example: localStorage.setItem("tasks", JSON.stringify(tasks))

★ localStorage.removeItem(key)
→ Removes stored data
Used during logout

🔹 JSON Methods

★ JSON.parse()
→ Converts JSON string to JavaScript object

★ JSON.stringify()
→ Converts JavaScript object to JSON string

🔹 Array Methods

★ Array.some()
→ Checks if a condition exists in array
Used to validate unique usernames

★ Array.splice(index, 1)
→ Removes task from list

★ Array.forEach()
→ Displays tasks dynamically

🔹 jQuery Methods

★ .on("click", selector, function)
→ Handles click events for dynamic content

★ .load("page.html")
→ Loads pages without reload

★ .attr()
→ Gets or sets element attributes

★ .addClass() / .removeClass()
→ Shows or hides messages dynamically

🔹 String & Date Methods

★ trim()
→ Removes extra spaces from input

★ new Date().toLocaleDateString()
→ Returns current date

★ new Date().toLocaleTimeString()
→ Returns current time

⭐ 5. Key Variables

★ loggedInUser
→ Stores current logged-in user

★ users
→ Stores all registered users

★ tasks
→ Stores tasks for each user

★ editIndex
→ Tracks task editing state

⭐ 6. Functional Overview
🔹 Registration

✔ Validates all inputs
✔ Checks password match
✔ Ensures unique username
✔ Saves user in LocalStorage
✔ Redirects to login page

🔹 Login

✔ Validates credentials
✔ Saves session in LocalStorage
✔ Loads dashboard on success
✔ Shows error on failure

🔹 Logout

✔ Clears session
✔ Redirects to login page

🔹 Dashboard

★ loadDashboard()
→ Loads dashboard & username
→ Calls loadTasks()

★ loadTasks()
→ Displays user tasks
→ Adds Edit & Delete buttons

🔹 Add Task

✔ Adds new task with date & time
✔ Saves task to LocalStorage
✔ Refreshes task list

🔹 Edit Task

✔ Loads task into input field
✔ Updates task text & timestamp
✔ Resets edit mode

🔹 Delete Task

✔ Removes task using splice()
✔ Updates LocalStorage
✔ Refreshes task list

⭐ 7. Technologies Used

🔹 HTML
🔹 CSS
🔹 Bootstrap 5
🔹 JavaScript
🔹 jQuery
🔹 LocalStorage

⭐ 8. Features

✔ User Authentication
✔ Dynamic Page Loading
✔ CRUD Operations on Tasks
✔ Session Management
✔ No Backend Required
