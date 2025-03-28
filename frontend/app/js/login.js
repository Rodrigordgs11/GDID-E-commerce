document.addEventListener("DOMContentLoaded", async function () {
    localStorage.setItem('loginPageURL', window.location.href);
    const baseUrl = window.location.origin + window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const client_id = urlParams.get("client_id");
    const client_secret = urlParams.get("client_secret");
    
    let codeVerifier = null;
    if (document.cookie.includes("code_verifier")) {
        codeVerifier = document.cookie.split(";").find((cookie) => cookie.includes("code_verifier")).split("=")[1];
        document.cookie = "code_verifier=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    checkSSO();

    if (code) {
        const data = {
            code,
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: baseUrl,
            code_verifier: codeVerifier,
        };

        try {
            const response = await fetch("http://localhost:3001/exchange-code-for-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            checkSSO();

            if (responseData.error) {
                alert("Error while exchanging code for token: " + responseData.error);
            } else {
                const userRole = await getUserRole(responseData.id_token);

                if (userRole === "admin") {
                    window.location.href = "http://localhost:8181/admin/index.html";
                } else if (userRole === "customer") {
                    window.location.href = "http://localhost:8181/";
                } else {
                    window.location.href = "http://localhost:8181/login.html";
                }
            }
        } catch (error) {
            alert("Error while exchanging code for token: " + error);
        }
    }
});

async function getUserRole(id_token) {
    try {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${id_token}`);

        const response = await fetch("http://localhost:3002/user-role", {
            method: "GET",
            headers: headers,
        });

        const data = await response.json();

        if (data.error) {
            alert("Error while fetching user role: " + data.error);
            return null; 
        } else {
            return data.role; 
        }
    } catch (error) {
        alert("Error while fetching user role: " + error);
        return null;
    }
}

async function checkSSO() {
    const response = await fetch("http://localhost:3001/verify", { credentials: "include" });
    const data = await response.json();

    if (data.authenticated) {
        const userRole = await getUserRole(data.token);
        if (userRole === "admin") {
            window.location.href = "http://localhost:8181/admin/index.html";
        } else if (userRole === "customer") {
            window.location.href = "http://localhost:8181/";
        }
    } else {
        //window.location.href = "http://localhost:8181/login.html";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3002/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Login failed");
            }

            const data = await response.json();

            const userRole = await getUserRole(data.access_token);

            if (userRole === "admin") {
                window.location.href = "http://localhost:8181/admin/index.html";
            } else if (userRole === "customer") {
                window.location.href = "http://localhost:8181/";
            } else {
                window.location.href = "http://localhost:8181/login.html";
            }

        } catch (error) {
            document.getElementById("errorMessage").innerText = "Error: " + error.message;
        }
    });
});
