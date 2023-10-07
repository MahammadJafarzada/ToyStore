let wishlistbtns = document.querySelectorAll(".wishlist");
let wishlistViewItem = document.getElementById("Wishlist-items");
let products = JSON.parse(localStorage.getItem("products")) || [];

function removeFromWishlist(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    WishlistView();
}

for (let wishlistbtn of wishlistbtns) {
    wishlistbtn.onclick = function (e) {
        e.preventDefault();

        let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        let isAlreadyInWishlist = products.some(product => product.Id === id);

        if (!isAlreadyInWishlist) {
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

            localStorage.setItem("products", JSON.stringify(products));

            WishlistView();
        }
    };
}

function WishlistView() {
    wishlistViewItem.innerHTML = "";
    if (products.length === 0) {
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

WishlistView();
