document.addEventListener("DOMContentLoaded", function () {
    // Toggle password visibility (password.html)
    const passwordInput = document.getElementById("InputPassword");
    const toggleButton = document.getElementById("toggle-password");
    if (passwordInput && toggleButton) {
        const imgElements = toggleButton.getElementsByTagName("img");
        toggleButton.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                imgElements[0].style.display = "none";
                imgElements[1].style.display = "inline";
            } else {
                passwordInput.type = "password";
                imgElements[0].style.display = "inline";
                imgElements[1].style.display = "none";
            }
        });
        imgElements[0].style.display = "inline";
        imgElements[1].style.display = "none";
    }

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    const emailForm = document.getElementById("emailForm");
    const emailInput = document.getElementById("InputIdentityFlowValue");

    // index.html: validate email and go to password step
    if (emailForm && emailInput) {
        const errorMessage = document.getElementById("errorMessage");
        emailForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = emailInput.value.trim();
            if (!validateEmail(email)) {
                errorMessage.style.display = "block";
            } else {
                errorMessage.style.display = "none";
                localStorage.setItem("login_email", email);
                window.location.href = "password.html";
            }
        });
    }

    // password.html: validate password and loop back to login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const pw = passwordInput.value.trim();
            if (!pw) {
                return;
            }
            window.location.href = "index.html";
        });
    }

    // password.html: show the email entered in the previous step
    const displayEmail = document.getElementById("displayEmail");
    if (displayEmail) {
        displayEmail.textContent = localStorage.getItem("login_email") || "your email";
    }
});
