let cart = JSON.parse(localStorage.getItem('cart')) || []; 
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
        <input type="number" id="quantity-${product.id}" min="1" max="${product.stock}" value="1" />
        <button id="add-to-cart-${product.id}" onclick="addToCart(${product.id})">Agregar al Carrito</button>
    `;
    return productDiv;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    if (product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            const newQuantity = existingProduct.quantity + quantity;
            if (newQuantity <= product.stock) {
                existingProduct.quantity = newQuantity;
                console.log('Cantidad actualizada en el carrito:', product);
            } else {
                console.log('No se puede agregar más unidades que el stock disponible.');
                showToast('No se puede agregar más unidades que el stock disponible.', '#FF5733');
            }
        } else {
            if (quantity <= product.stock) {
                cart.push({ ...product, quantity }); 
                console.log('Producto agregado al carrito:', product);
            } else {
                console.log('No se puede agregar más unidades que el stock disponible.');
                showToast('No se puede agregar más unidades que el stock disponible.', '#FF5733');
            }
        }

        updateLocalStorage(); 
        renderCart(); 
    } else {
        console.error('Producto no encontrado:', productId);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); 
    updateLocalStorage(); 
    renderCart(); 
}

function renderCart() {
    const cartList = document.getElementById('cart-list'); 
    if (!cartList) {
        console.error('El elemento con ID "cart-list" no se encontró en el DOM.');
        return; 
    }
    
    cartList.innerHTML = ''; 

    let total = 0; 
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-logo">
            <span>${item.name} - $${item.price} x ${item.quantity}</span> <!-- Muestra la cantidad -->
            <button onclick="removeFromCart(${item.id})">Eliminar</button> <!-- Botón para eliminar -->
        `;
        cartList.appendChild(cartItem);
        total += item.price * item.quantity; 
    });

    document.getElementById('total').textContent = `Total: $${total}`; 
}

function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); 
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
renderCart(); 