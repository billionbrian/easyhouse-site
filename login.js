document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", async function(e) {
        e.preventDefault(); // Prevent the default form submit

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!" && data.token) {
                // Store the token in localStorage
                localStorage.setItem("token", data.token);
                
                console.log("Login successful:", data);
                // Redirect the user
                window.location.href = "home.html";
            } else {
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Login failed due to a network error.");
        }
    });
});

            


            