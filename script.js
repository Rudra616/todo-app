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

    // REGISTER
    $(document).on("click", ".register", function () {
        const username = $(".username").val().trim();
        const password = $(".password").val().trim();
        $(".error").text("");

        if (!username || !password) {
            $(".error").text("All fields required");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.username === username)) {
            $(".error").text("Username already exists");
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        $("#content").load("login.html");
    });

    // LOGIN
    $(document).on("click", ".login", function () {
        const username = $(".username").val().trim();
        const password = $(".password").val().trim();
        $(".error").text("");

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", username);
            loadDashboard();
        } else {
            $(".error").text("Invalid username or password");
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
        if (!tasks[username]) tasks[username] = [];

        tasks[username].push({
            text: taskText,
            date: new Date().toLocaleDateString()
        });

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

    function loadTasks() {
        const username = localStorage.getItem("loggedInUser");
        let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        let userTasks = tasks[username] || [];

        $("#taskTable").html("");

        userTasks.forEach(task => {
            $("#taskTable").append(`
                <tr>
                    <td>${task.text}</td>
                    <td>${task.date}</td>
                </tr>
            `);
        });
    }

});
