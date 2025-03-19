document.addEventListener("DOMContentLoaded", async function () {
    let access_token;
    if (document.cookie.split(";").find((cookie) => cookie.includes("app1_access_token"))) {
        access_token = document.cookie.split(";").find((cookie) => cookie.includes("app1_access_token")).split("=")[1];
    } else if (document.cookie.split(";").find((cookie) => cookie.includes("idp_access_token"))) {
        access_token = document.cookie.split(";").find((cookie) => cookie.includes("idp_access_token")).split("=")[1];
    }

    const user = await fetch("http://localhost:3002/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
        },

    }).then((response) => response.json());

    fetchOrders(user.id);

    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-phone").textContent = user.phone;

    const isAuthenticatedThroughIDP = document.cookie.split(";").find((cookie) => cookie.includes("app1_access_token"));
    if (!isAuthenticatedThroughIDP) {
        document.getElementById("edit-button").classList.add("d-none");
    }
});

let originalUserInfo = {
    name: "Nome do Usuário",
    email: "email@exemplo.com",
    phone: "(11) 99999-9999"
};

function toggleEdit() {
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

    let access_token;
    if (document.cookie.split(";").find((cookie) => cookie.includes("app1_access_token"))) {
        access_token = document.cookie.split(";").find((cookie) => cookie.includes("app1_access_token")).split("=")[1];
    } else if (document.cookie.split(";").find((cookie) => cookie.includes("idp_access_token"))) {
        access_token = document.cookie.split(";").find((cookie) => cookie.includes("idp_access_token")).split("=")[1];
    }

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
            location.reload();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("An unexpected error occurred: " + error.message);
    }
}

function fetchOrders(userId) {
    let access_token;
    if (document.cookie.split(";").find((cookie) => cookie.includes("app1_access_token"))) {
        access_token = document.cookie.split(";").find((cookie) => cookie.includes("app1_access_token")).split("=")[1];
    } else if (document.cookie.split(";").find((cookie) => cookie.includes("idp_access_token"))) {
        access_token = document.cookie.split(";").find((cookie) => cookie.includes("idp_access_token")).split("=")[1];
    }

    fetch('http://localhost:3002/orders/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const orderHistory = document.getElementById('order-history');
        orderHistory.innerHTML = ''; 
        if (!data.orders || data.orders.length === 0) {
            orderHistory.innerHTML = '<p class="text-center text-muted">Nenhum pedido encontrado</p>';
            return;
        }

        data.orders.forEach((order, index) => {
            const orderDate = new Date(order.date).toLocaleString();
            const orderId = `order-${index + 1}`;
            const collapseId = `collapse-${index}`; // Unique ID for each accordion

            const itemsList = order.OrderItems.map(item => `
                <li class="list-group-item">
                    <strong>Produto:</strong> ${item.Product.name} <br>
                    <strong>Quantidade:</strong> ${item.quantity} <br>
                    <strong>Preço:</strong> ${item.price.toFixed(2)}€
                </li>
            `).join('');

            const orderElement = document.createElement('div');
            orderElement.className = 'accordion-item';
            orderElement.innerHTML = `
                <h2 class="accordion-header" id="${orderId}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#${collapseId}" aria-expanded="false"
                        style="background-color: black; color: white;">
                        Pedido #${index + 1} - ${order.status} 
                        <small class="ms-3 text-muted">(${orderDate})</small>
                    </button>
                </h2>
                <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${orderId}" data-bs-parent="#order-history">
                    <div class="accordion-body">
                        <h6>Total: ${order.total.toFixed(2)}€</h6>
                        <ul class="list-group mt-2">
                            ${itemsList}
                        </ul>
                    </div>
                </div>
            `;

            orderHistory.appendChild(orderElement);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
        document.getElementById('order-history').innerHTML = 
            '<p class="text-center text-danger">Erro ao carregar os pedidos</p>';
    });
}
