let wishlistbtns = document.querySelectorAll("#Wishlist");
let wishlistViewItem = document.getElementById("Wishlist-items");

// Load the wishlist items from localStorage when the page loads
let products = JSON.parse(localStorage.getItem("product")) || [];


// Function to remove an item from the wishlist by its index
function removeFromWishlist(index) {
    products.splice(index, 1);
    // Store the updated wishlist items in localStorage
    localStorage.setItem("product", JSON.stringify(products));
    // Refresh the wishlist view
    WishlistView();
}

for (let wishlistbtn of wishlistbtns) {
    wishlistbtn.onclick = function (e) {
        e.preventDefault();
        let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        let img = this.parentElement.parentElement.previousElementSibling.src;
        let price = this.parentElement.parentElement.parentElement.nextElementSibling.children[2].innerHTML;
        let title = this.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0].innerHTML;

        let product = {
            Id: id,
            Img: img,
            Price: price,
            Title: title
        };
        products.push(product);

        // Store the updated wishlist items in localStorage
        localStorage.setItem("product", JSON.stringify(products));
        // Refresh the wishlist view
        WishlistView();
    };
}

function WishlistView() {
    // Clear the existing content in the wishlist view
    if (products.length === 0) {
        // Wishlist is empty, display a placeholder message or image
        wishlistViewItem.innerHTML = `
                <div class="wish-imag">
                    <div class="wish-title ">
                        <h3>
                            Your wishlist empty 
                        </h3>
                        <button class="back-shop">Back to Shopping</button>
                    </div>
                    <div class="wish-img ">
                        <img src="./assets/Img/closeup-empty-trolley-ready-christmas-shopping-purple-background__1_-removebg-preview.png" alt="">
                    </div>
                </div>`;
    } else{

        
        for (let i = 0; i < products.length; i++) {
        const { Img, Id, Price, Title } = products[i];
        wishlistViewItem.innerHTML += `
        <div class="product col-lg-4 col-md-6 col-s-12">
            <span class="delete-item" onclick="removeFromWishlist(${i})"><i class="fa-solid fa-trash"></i></span>
            <div class="product-img">
                <img src=${Img} alt="">
                <div class="overlay">
                    <a href="product.html"><i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                    </div>
                    <div class="product-title--price">
                    <p><a href="#">${Title}</a></p>
                    <p>${Price} <span>$</span></p>
            </div>
        </div>
        `;
    }
}
}

// Call WishlistView to display the wishlist items when the page loads
WishlistView();
