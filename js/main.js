let cart = []; 
let products = []; 

async function fetchProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Error al cargar el archivo JSON');

        products = await response.json();
        console.log('Productos cargados:', products);
        displayProducts(products);
    } catch (error) {
        console.error(error);
        showToast('No se pudieron cargar los productos. Intenta de nuevo más tarde.', '#FF5733');
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (!Array.isArray(products)) {
        console.error('La variable products no es un array:', products);
        return;
    }

    products.forEach(product => {
        const productDiv = createProductElement(product);
        productList.appendChild(productDiv);
    });
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <p>Stock disponible: ${product.stock}</p>
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <button id="add-to-cart-${product.id}" onclick="addToCart(${product.id})">Agregar al Carrito</button>
    `;
    return productDiv;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (!existingProduct) {
            cart.push(product);
            console.log('Producto agregado al carrito:', product);
        } else {
            console.log('El producto ya está en el carrito:', product);
        }
        
        renderCart(); 
    } else {
        console.error('Producto no encontrado:', productId);
    }
}

function renderCart() {
    const cartList = document.getElementById('cart-list'); 
    cartList.innerHTML = ''; 

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-logo">
            <span>${item.name} - $${item.price}</span>
        `;
        cartList.appendChild(cartItem);
    });
}

function showToast(message, backgroundColor) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: backgroundColor,
    }).showToast();
}


fetchProducts();