document.addEventListener("DOMContentLoaded", function () {
  const minPriceInput = document.querySelector(".input-min");
  const maxPriceInput = document.querySelector(".input-max");
  const rangeMin = document.querySelector(".range-min");
  const rangeMax = document.querySelector(".range-max");
  const progress = document.querySelector(".progress");
  const filterButton = document.querySelector(".range-button button");
  const products = document.querySelectorAll(".product");

  function filterProducts() {
      let minPrice = parseInt(minPriceInput.value);
      let maxPrice = parseInt(maxPriceInput.value);

      products.forEach(product => {
          let productPrice = parseInt(product.querySelector(".my-card-price span").textContent);
          if (productPrice >= minPrice && productPrice <= maxPrice) {
              product.style.display = "block";
          } else {
              product.style.display = "none";
          }
      });
  }

  function updateRangeInputs() {
      minPriceInput.value = rangeMin.value;
      maxPriceInput.value = rangeMax.value;
      progress.style.left = ((rangeMin.value / rangeMax.max) * 100) + "%";
      progress.style.right = 100 - (rangeMax.value / rangeMax.max) * 100 + "%";
  }

  minPriceInput.addEventListener("input", () => {
      rangeMin.value = minPriceInput.value;
      updateRangeInputs();
  });

  maxPriceInput.addEventListener("input", () => {
      rangeMax.value = maxPriceInput.value;
      updateRangeInputs();
  });

  rangeMin.addEventListener("input", () => {
      minPriceInput.value = rangeMin.value;
      updateRangeInputs();
  });

  rangeMax.addEventListener("input", () => {
      maxPriceInput.value = rangeMax.value;
      updateRangeInputs();
  });

  filterButton.addEventListener("click", filterProducts);
});
