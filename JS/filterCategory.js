document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("category-filter");
    const productContainer = document.getElementById("product-container");
    const products = productContainer.querySelectorAll(".product");

    categoryFilter.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            const category = event.target.parentElement.getAttribute("data-filter");
            filterProducts(category);
        }
    });

    function filterProducts(category) {
        products.forEach(function (product) {
            const productCategories = product.getAttribute("data-filter").split(" ");
            if (category === "all" || productCategories.includes(category)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }
});
