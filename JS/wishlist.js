let wishlistbtns = document.querySelectorAll(".wishlist");
let wishlistViewItem = document.getElementById("Wishlist-items");
let products = JSON.parse(localStorage.getItem("products")) || [];


function removeFromWishlist(index) {
    products.splice(index, 1);
    localStorage.removeItem("products", JSON.stringify(products));
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
        onClick: function () { } // Callback after click
    }).showToast();
    WishlistView();

}

// for (let wishlistbtn of wishlistbtns) {
//     wishlistbtn.onclick = function (e) {
//         e.preventDefault();
//         let id = document.querySelector('.my-card').getAttribute("data-id");
//         let isAlreadyInWishlist = products.every(product => product.Id === id);
//         if (!isAlreadyInWishlist) {
//             let img = document.querySelector(".my-card-img img").getAttribute("src");
//             let price = document.querySelector('.my-card-price').getAttribute("data-price");
//             let title = document.querySelector('.my-card-title').getAttribute("data-title");
//             let product = {
//                 Id: id,
//                 Img: img,
//                 Price: price,
//                 Title: title
//             };
//             products.push(product);

//             localStorage.setItem("products", JSON.stringify(products));
//             Toastify({
//                 text: "Товар добавлен",
//                 duration: 1000,
//                 newWindow: true,
//                 close: true,
//                 gravity: "top", // `top` or `bottom`
//                 position: "right", // `left`, `center` or `right`
//                 stopOnFocus: true, // Prevents dismissing of toast on hover
//                 style: {
//                     background: "#12AEE0",
//                 },
//                 onClick: function () { } // Callback after click
//             }).showToast();

//             WishlistView();
//         }
//         else {
//             Toastify({
//                 text: "Данный товар в Корзине",
//                 duration: 3000,
//                 newWindow: true,
//                 close: true,
//                 gravity: "top",
//                 position: "right",
//                 stopOnFocus: true,
//                 style: {
//                     background: "#12AEE0",
//                 },
//                 onClick: function () { }
//             }).showToast();

//         }
//     };
// }
wishlistbtns.forEach((wishlistbtn) => {
    wishlistbtn.addEventListener("click", (e) => {
        e.preventDefault();

        let card = e.target.closest('.my-card');
        let id = card.getAttribute("data-id");
        let img = card.querySelector(".my-card-img img").getAttribute("src");
        let price = card.querySelector('.my-card-price').getAttribute("data-price");
        let title = card.querySelector('.my-card-title').getAttribute("data-title");
        let isAlreadyInWishlist = products.some(product => product.Id === id);

        if (!isAlreadyInWishlist) {
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
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#12AEE0",
                },
                onClick: function () { }
            }).showToast();
            WishlistView();
        } else {
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
                onClick: function () { }
            }).showToast();
        }
    });
});
function WishlistView() {
    wishlistViewItem.innerHTML = "";
    if (products.length === 0) {
        wishlistViewItem.innerHTML += `
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
        wishlistViewItem.innerHTML += `<div class="col-12 col-lg-12 col-md-12 col-xs-12">
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
