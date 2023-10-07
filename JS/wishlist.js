// Select all elements with the class "wishlist" (wishlist icons)
let wishlistbtns = document.querySelectorAll(".wishlist");

// Select the element where wishlist items will be displayed
let wishlistViewItem = document.getElementById("Wishlist-items");

// Load the wishlist items from localStorage when the page loads
let products = JSON.parse(localStorage.getItem("products")) || [];

// Function to remove an item from the wishlist by its index
function removeFromWishlist(index) {
    products.splice(index, 1);
    // Store the updated wishlist items in localStorage
    localStorage.setItem("products", JSON.stringify(products));
    // Refresh the wishlist view
    WishlistView();
}

// Loop through each wishlist icon and add a click event listener
for (let wishlistbtn of wishlistbtns) {
    wishlistbtn.onclick = function (e) {
        e.preventDefault();

        // Check if the product is already in the wishlist
        let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        let isAlreadyInWishlist = products.some(product => product.Id === id);

        if (!isAlreadyInWishlist) {
            // Extract product data (img, price, title)
            let img = this.parentElement.parentElement.previousElementSibling.src;
            let price = this.parentElement.parentElement.parentElement.nextElementSibling.children[2].innerHTML;
            let title = this.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0].innerHTML;

            // Create a product object
            let product = {
                Id: id,
                Img: img,
                Price: price,
                Title: title
            };

            // Add the product to the wishlist array
            products.push(product);

            // Store the updated wishlist items in localStorage
            localStorage.setItem("products", JSON.stringify(products));

            // Refresh the wishlist view
            WishlistView();
        }
    };
}

// Function to display wishlist items
function WishlistView() {
    // Clear the existing content in the wishlist view
    wishlistViewItem.innerHTML = "";

    // Check if the wishlist is empty
    if (products.length === 0) {
        // Wishlist is empty, display a placeholder message or image
        wishlistViewItem.innerHTML = `
            <div class="wish-imag">
                <div class="wish-title ">
                    <h3>Your wishlist is empty</h3>
                    <button class="back-shop"><a href="./shop.html">Back to Shopping</a></button>
                </div>
                <div class="wish-img ">
                    <img src="./assets/Img/closeup-empty-trolley-ready-christmas-shopping-purple-background__1_-removebg-preview.png" alt="">
                </div>
            </div>`;
    } else {
        // Loop through each product in the wishlist and display it
        for (let i = 0; i < products.length; i++) {
            const { Img, Id, Price, Title } = products[i];
            wishlistViewItem.innerHTML += `
                <div class="product col-lg-3 col-md-4 col-s-12">
                    <span class="delete-item" onclick="removeFromWishlist(${i})"><i class="fa-solid fa-trash"></i></span>
                    <div class="product-img">
                        <img src="${Img}" alt="">
                        <div class="overlay">
                            <a href="product.html"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="product-title--price">
                        <p><a href="product.html">${Title}</a></p>
                        <p>${Price} <span>$</span></p>
                    </div>
                </div>
            `;
        }
    }
}

// Call the WishlistView function to initialize the wishlist view
WishlistView();
