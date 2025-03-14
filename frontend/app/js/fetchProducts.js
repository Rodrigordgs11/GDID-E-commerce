document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

function fetchProducts() {
    fetch("http://localhost:3002/products") 
        .then(response => response.json())
        .then(data => displayProducts(data.products))
        .catch(error => console.error("Erro ao buscar produtos:", error));
}

function createProductCard(product) {
    return `
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="${product.image}" alt="${product.name}" style="height: 200px; object-fit: cover;" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${product.name}</h5>
                        <span>${product.price} €</span>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Ver mais</a></div>
                </div>
            </div>
        </div>
    `;
}

function displayProducts(products) {
    const productsContainer = document.getElementById("product-list");

    if (!products || products.length === 0) {
        productsContainer.innerHTML = "<p class='text-center'>Nenhum produto encontrado.</p>";
        return;
    }

    productsContainer.innerHTML = products.map(createProductCard).join("");
}