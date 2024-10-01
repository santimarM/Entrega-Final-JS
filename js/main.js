async function fetchProducts() {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) throw new Error('No hay productos en stock');

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error(error);
        Toastify({
            text: "No hay Stock disponible ",
            duration: 3000,
            gravity: "top",
            position: 'right',
            backgroundColor: '#F44336',
        }).showToast();
    } finally {
        console.log("Carga de productos completada");
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" class="cart-item-logo">
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">Agregar al Carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}


fetchProducts();