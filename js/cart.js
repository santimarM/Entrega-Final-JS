const products = [
    { id: 1, name: 'Corte diagonal', price: 4500, image: 'Corte diagonal.jpg' }, 
    { id: 2, name: 'Vela de soja (Ambar Vidrio con tapa)', price: 6500,image: 'Vela de soja (Ambar Vidrio con tapa).jpg' },
    { id: 3, name: 'Colgante Difusor para Auto', price: 900, image: 'Colgante auto.jpg'  },
];

const cart = [];
const totalElement = document.getElementById('total');


function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}



function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item'; 
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-logo">
            ${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartDiv.appendChild(cartItem);
        total += item.price;
    });

    totalElement.textContent = total;
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


displayProducts();