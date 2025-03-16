document.addEventListener("DOMContentLoaded", async function () {

    const access_token = document.cookie.split(";").find((cookie) => cookie.includes("access_token")).split("=")[1];

    const user = await fetch("http://localhost:3002/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
        },

    }).then((response) => response.json());


    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-phone").textContent = user.phone;
});

let originalUserInfo = {
    name: "Nome do Usuário",
    email: "email@exemplo.com",
    phone: "(11) 99999-9999"
};

function toggleEdit() {
    const userInfoDiv = document.getElementById("user-info");
    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");

    const nameElement = document.getElementById("user-name");
    const emailElement = document.getElementById("user-email");
    const phoneElement = document.getElementById("user-phone");

    if (editButton.textContent === "Editar Perfil") {
        editButton.textContent = "Cancelar Edição";
        saveButton.classList.remove("d-none");

        nameElement.innerHTML = `<input type="text" id="edit-name" value="${nameElement.textContent}" class="form-control mx-auto" required style="width: 40%; text-align: center;">`;
        emailElement.innerHTML = `<input type="email" id="edit-email" value="${emailElement.textContent}" class="form-control mx-auto" required style="width: 40%; text-align: center;">`;
        phoneElement.innerHTML = `<input type="tel" id="edit-phone" value="${phoneElement.textContent}" class="form-control mx-auto" required style="width: 40%; text-align: center;">`;
    } else {
        editButton.textContent = "Editar Perfil";
        saveButton.classList.add("d-none");

        nameElement.textContent = document.getElementById("edit-name").value;
        emailElement.textContent = document.getElementById("edit-email").value;
        phoneElement.textContent = document.getElementById("edit-phone").value;
    }
}


async function editProfile() {
    const name = document.getElementById("edit-name").value.trim();
    const email = document.getElementById("edit-email").value.trim();
    const phone = document.getElementById("edit-phone").value.trim();

    const access_token = document.cookie.split(";").find((cookie) => cookie.includes("access_token")).split("=")[1];


    if (!name || !email || !phone) {
        alert("All fields are required!");
        return;
    }

    const requestBody = {
        name: name,
        email: email,
        phone: phone
    };

    try {
        const response = await fetch("http://localhost:3002/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Profile updated successfully!");
            location.reload();
        } else {
            alert(`Error: ${data.error || "Unable to update profile"}`);
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("An unexpected error occurred: " + error.message);
    }
}
