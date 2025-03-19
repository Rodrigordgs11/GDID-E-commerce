document.addEventListener("DOMContentLoaded", function () {
    loadProduct();
});

async function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        alert("Produto não encontrado!");
        return;
    }

    try {
        let access_token;
        if (document.cookie.split(";").find((cookie) => cookie.includes("app1_access_token"))) {
            access_token = document.cookie.split(";").find((cookie) => cookie.includes("app1_access_token")).split("=")[1];
        } else if (document.cookie.split(";").find((cookie) => cookie.includes("idp_access_token"))) {
            access_token = document.cookie.split(";").find((cookie) => cookie.includes("idp_access_token")).split("=")[1];
        }

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${access_token}`);
        
        const response = await fetch(`http://localhost:3002/products/${productId}`, { method: "GET", headers: headers });
        if (!response.ok) throw new Error("Produto não encontrado");
        const product = await response.json();

        // Selecionar elementos e verificar se existem
        const imgElement = document.querySelector(".card-img-top");
        const titleElement = document.querySelector(".display-5");
        const priceElement = document.querySelector(".fs-5 span:last-child");
        const descElement = document.querySelector(".lead");

        if (imgElement) imgElement.src = product.image;
        if (titleElement) titleElement.textContent = product.name;
        if (priceElement) priceElement.textContent = `${product.price} €`;
        if (descElement) descElement.textContent = product.description;
    } catch (error) {
        console.error("Erro ao carregar o produto:", error);
        alert("Erro ao carregar o produto.");
    }
}