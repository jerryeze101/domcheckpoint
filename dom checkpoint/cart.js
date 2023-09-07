
// Sample product data
const products = [
    { id: 1, name: "Product 1", price: 10.00, quantity: 2 },
    { id: 2, name: "Product 2", price: 15.00, quantity: 1 },
    { id: 3, name: "Product 3", price: 20.00, quantity: 3 }
];

const cart = document.getElementById("cart");
const totalPriceElement = document.getElementById("total-price");

// Function to update the cart
function updateCart() {
    cart.innerHTML = "";
    let totalPrice = 0;

    products.forEach(product => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        const itemName = document.createElement("span");
        itemName.textContent = product.name;

        const itemPrice = document.createElement("span");
        itemPrice.textContent = `$${(product.price * product.quantity).toFixed(2)}`;

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = product.quantity;
        quantityInput.min = "1";
        quantityInput.addEventListener("input", () => {
            product.quantity = parseInt(quantityInput.value);
            updateCart();
        });

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.addEventListener("click", () => {
            product.quantity++;
            quantityInput.value = product.quantity;
            updateCart();
        });

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.addEventListener("click", () => {
            if (product.quantity > 1) {
                product.quantity--;
                quantityInput.value = product.quantity;
                updateCart();
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            const index = products.indexOf(product);
            if (index !== -1) {
                products.splice(index, 1);
                updateCart();
            }
        });

        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(decreaseButton);
        itemDiv.appendChild(quantityInput);
        itemDiv.appendChild(increaseButton);
        itemDiv.appendChild(deleteButton);

        cart.appendChild(itemDiv);

        totalPrice += product.price * product.quantity;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

updateCart();
