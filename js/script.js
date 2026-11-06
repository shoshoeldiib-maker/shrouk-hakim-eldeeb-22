// Shopping Cart
let cart = JSON.parse(localStorage.getItem("roshdyCart")) || [];

const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

// Add products to cart
document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", function () {

        let id = this.dataset.id;
        let name = this.dataset.name;
        let price = Number(this.dataset.price);

        let product = cart.find(item => item.id === id);

        if (product) {
            product.quantity++;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }

        saveCart();
        displayCart();

        alert("تمت إضافة المنتج للسلة بنجاح!");
    });

});

// Display Cart
function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="text-center text-muted">السلة فارغة</p>';
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        let div = document.createElement("div");
        div.className = "border rounded p-3 mb-3";

        let title = document.createElement("h6");
        title.textContent = item.name;

        let price = document.createElement("p");
        price.textContent = item.price + " جنيه";

        let quantity = document.createElement("span");
        quantity.textContent = "الكمية: " + item.quantity;

        let increase = document.createElement("button");
        increase.className = "btn btn-sm btn-success me-2";
        increase.textContent = "+";
        increase.onclick = () => changeQuantity(index, 1);

        let decrease = document.createElement("button");
        decrease.className = "btn btn-sm btn-warning me-2";
        decrease.textContent = "-";
        decrease.onclick = () => changeQuantity(index, -1);

        let remove = document.createElement("button");
        remove.className = "btn btn-sm btn-danger";
        remove.textContent = "حذف";
        remove.onclick = () => removeProduct(index);

        div.append(title, price, quantity, document.createElement("br"),
                   increase, decrease, remove);

        cartItems.appendChild(div);
    });

    totalElement.textContent = total;
    cartCount.textContent = count;

    saveCart();
}

// Change Quantity
function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

// Remove Product
function removeProduct(index) {

    cart.splice(index, 1);

    displayCart();
}

// Save Cart
function saveCart() {

    localStorage.setItem("roshdyCart", JSON.stringify(cart));
}

// Filter Categories
document.querySelectorAll(".category-btn").forEach(button => {

    button.addEventListener("click", function () {

        let category = this.dataset.category;

        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("btn-danger");
            btn.classList.add("btn-outline-danger");
        });

        this.classList.remove("btn-outline-danger");
        this.classList.add("btn-danger");

        document.querySelectorAll(".product").forEach(product => {

            if (category === "all" ||
                product.dataset.category === category) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});

// Checkout
document.getElementById("checkout").addEventListener("click", function () {

    if (cart.length === 0) {
        alert("السلة فارغة! أضيفي منتجات أولاً.");
        return;
    }

    let total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    alert("تم تجهيز طلبك بنجاح!\nإجمالي الطلب: " + total + " جنيه");

    cart = [];
    displayCart();

});

// Contact Form
document.querySelector("form").addEventListener("submit", function(event) {

    event.preventDefault();

    alert("شكراً لتواصلك مع مطعم رشدي على السريع!");

    this.reset();

});

// Load Saved Cart
displayCart();