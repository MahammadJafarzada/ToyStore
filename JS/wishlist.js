let wishlistbtns = document.querySelectorAll(".wishlist");
let wishlistViewItem = document.getElementById("Wishlist-items");
let products = JSON.parse(localStorage.getItem("products")) || [];


function removeFromWishlist(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    Toastify({
        text: "Товар удален",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#12AEE0",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    WishlistView();
    
}

for (let wishlistbtn of wishlistbtns) {
    wishlistbtn.onclick = function (e) {
        e.preventDefault();
        let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        let isAlreadyInWishlist = products.some(product => product.Id === id);
        try {
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
                Toastify({
                    text: "Товар добавлен",
                    duration: 1000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "#12AEE0",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();

               WishlistView();
            }
            else{
                Toastify({
                    text: "Данный товар в Корзине",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", 
                    position: "right",
                    stopOnFocus: true, 
                    style: {
                      background: "#12AEE0",
                    },
                    onClick: function(){} 
                  }).showToast();

            }
        } catch (error) {
            if (!isAlreadyInWishlist) {
                 let img = this.parentElement.parentElement.previousElementSibling.children[0].src;
                 let price = this.parentElement.previousElementSibling.previousElementSibling.children[0].children[0].innerHTML;
                let title = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[0].innerHTML;
                console.log(price);
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
        }
       
    };
}


function WishlistView() {
    wishlistViewItem.innerHTML = "";
    
    if (products.length === 0) {
        wishlistViewItem.innerHTML = `
            <div class="wish-imag">
                <div class="wish-title ">
                    <h3>Ваш список желаний пуст</h3>
                    <button class="back-shop"><a href="./shop.html">Вернутся к просмотру товаров</a></button>
                </div>
                <div class="wish-img ">
                    <img src="./assets/Img/closeup-empty-trolley-ready-christmas-shopping-purple-background__1_-removebg-preview.png" alt="product">
                </div>
            </div>`;
    } else if (products.length > 0) {

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
        wishlistViewItem.innerHTML +=`<div class="col-12 col-lg-12 col-md-12 col-xs-12">
        <div class="wp--tg-title">
            <h2>Хотите заказать? Отправьте нам ссылку товара на наши мессенджеры!</h2>
            <div class="wp--telegram-button">
                <div class="wp-btn">
                    <button><a href="#">Whatsapp</a></button>
                </div>
                <div class="tg-btn">
                    <button><a href="#">Telegram</a></button>
                </div>
            </div>
        </div>
    </div>
    `
    }
}

WishlistView();
