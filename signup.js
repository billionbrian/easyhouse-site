 document.addEventListener("DOMContentLoaded", () 
=> {
    const signupForm = 
    document.getElementById("signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", async
            (e) => {
            e.preventDefault();

            const username = 
            document.getElementById("username").value;
            const email =
            document.getElementById("email").value;
            const password =
            document.getElementById("password").value;

            try{
                const response = await fetch("http://localhost:5000/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                });
                    
                const data = await response.json();

                if (response.ok) {
                    alert("Signup successful!");

                } else {
                    alert(`Signup failed: ${data.message}`);
                }
            } catch (error) {
                console.error("Error:", error);
alert("Signup failed. Something went wrong.");
            }
        });
    }else {
        console.error("Signup form not found in the HTML.");
    }
});
    

















