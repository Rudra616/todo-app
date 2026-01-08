$(document).ready(function () {

    // FIRST LOAD (NO RELOAD)
    if (localStorage.getItem("loggedInUser")) {
        loadDashboard();
    } else {
        $("#content").load("login.html");
    }

    // NAVIGATION
    $(document).on("click", ".ajax-link", function (e) {
        e.preventDefault();
        $("#content").load($(this).attr("href"));
    });

    $(document).on("click", ".toggle-password", function () {
        const target = $($(this).data("target"));
        const type = target.attr("type") === "password" ? "text" : "password";
        target.attr("type", type);
    });

    // REGISTER
    $(document).on("click", "#register", function (e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();
        const confirmPassword = $("#confirmPassword").val().trim();
        const errorMsg = $("#errorMsg");

        errorMsg.text("").addClass("d-none");

        if (!username || !password || !confirmPassword) {
            errorMsg.text("All fields are required.").removeClass("d-none");
            return;
        }

        if (password !== confirmPassword) {
            errorMsg.text("Password and Confirm Password do not match.")
                .removeClass("d-none");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.username === username)) {
            errorMsg.text("Username already exists.")
                .removeClass("d-none");
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        $("#content").load("login.html");
    });


    // LOGIN
    $(document).on("click", "#login", function (e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();
        const errorMsg = $("#errorMsg");

        errorMsg.text("").addClass("d-none");

        if (username === "" || password === "") {
            errorMsg
                .text("All fields are required.")
                .removeClass("d-none");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", username);
            loadDashboard();
        } else {
            errorMsg
                .text("Invalid username or password.")
                .removeClass("d-none");
        }
    });


    // LOGOUT
    $(document).on("click", ".logout", function () {
        localStorage.removeItem("loggedInUser");
        $("#content").load("login.html");
    });

    // ADD TASK
    $(document).on("click", "#submitTask", function () {
        const taskText = $("#enterTask").val().trim();
        if (!taskText) return;

        const username = localStorage.getItem("loggedInUser");
        let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        tasks[username] = tasks[username] || [];

        if (editIndex !== null) {
            tasks[username][editIndex].text = taskText;
            tasks[username][editIndex].updatedAt =
                new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

            editIndex = null;
            $("#submitTask").text("Submit");
        } else {
            tasks[username].push({
                text: taskText,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                updatedAt: "-"
            });
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        $("#enterTask").val("");
        loadTasks();
    });

    // FUNCTIONS
    function loadDashboard() {
        $("#content").load("dashboard.html", function () {
            $(".user-name").text(localStorage.getItem("loggedInUser"));
            loadTasks();
        });
    }
    $(document).on("click", ".deleteTask", function () {
        const index = $(this).data("index");
        const username = localStorage.getItem("loggedInUser");

        let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        tasks[username].splice(index, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    });

    let editIndex = null;

    $(document).on("click", ".editTask", function () {
        const index = $(this).data("index")
        const username = localStorage.getItem("loggedInUser");

        let tasks = JSON.parse(localStorage.getItem("tasks")) || {}
        const userTasks = tasks[username]

        $("#enterTask").val(userTasks[index].text)

        editIndex = index

        $("#submitTask").text("Update Task");


    });

    function loadTasks() {
        const username = localStorage.getItem("loggedInUser");
        let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        let userTasks = tasks[username] || [];

        $("#taskTable").html("");

        userTasks.forEach((task, index) => {
            $("#taskTable").append(`
                <tr>
                    <td>${task.text}</td>
                    <td>${task.date}</td>
                    <td>${task.time}</td>
                    <td>${task.updatedAt || "-"}</td>

                    <td class="text-center gap-2">
                    <div class="d-flex flex-column flex-md-row gap-2 justify-content-center">
                        <button class="btn btn-sm btn-warning editTask" data-index="${index}">
                            Edit
                        </button>
                        <button class="btn btn-sm btn-danger deleteTask" data-index="${index}">
                            Delete
                        </button>
                    </div>
                    </td>
                </tr>
            `);
        });
    }

});
