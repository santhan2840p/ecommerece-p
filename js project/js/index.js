// Fetch products
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    const productsData = data;

    const truncateText = (text, wordLimit) => {
      const words = text.split(" ");
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + " ...";
      }
      return text;
    };

    // Render products
    const renderProducts = (filteredProducts) => {
      const containerCards = filteredProducts
        .map((product) => {
          return `
            <div class="productCard" style="border:1px solid #ddd; padding:15px; margin:15px; border-radius:5px;">
              <img src="${product.image}" alt="${product.title}" style="width:150px; height:150px; margin-bottom:10px;" />
              <h6>${truncateText(product.title, 4)}</h6>
              <p>Category: ${product.category}</p>
              <p>${truncateText(product.description, 10)}</p>
              <div style="margin:10px 0; border:1px solid #ddd;"></div>
              <p style="font-size:18px; font-weight:bold;">Price: $${product.price}</p>
              <div style="display:flex; justify-content:space-between; margin-top:10px;">
                <button style="background-color:black; color:white; border:none; border-radius:5px; padding:5px 10px;">Details</button>
                <button 
                  class="addToCartBtn"
                  data-id="${product.id}" 
                  data-title="${product.title}" 
                  data-price="${product.price}" 
                  data-image="${product.image}" 
                  style="background-color:black; color:white; border:none; border-radius:5px; padding:5px 10px;">
                  Add to Cart
                </button>
              </div>
            </div>`;
        })
        .join("");

      const container = document.getElementById("container");
      container.innerHTML = containerCards;
    };

    // Initial render of all products
    renderProducts(productsData);

    const categoryButtons = document.querySelectorAll(".butn");
    categoryButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        categoryButtons.forEach((btn) => btn.classList.remove("active"));

        event.target.classList.add("active");
        const category = event.target.getAttribute("data-category");

        if (category === "all") {
          renderProducts(productsData);
        } else {
          const filteredProducts = productsData.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
          );
          renderProducts(filteredProducts);
        }
      });
    });

    // Add to Cart functionality
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("addToCartBtn")) {
        const button = event.target;
        const product = {
          id: button.getAttribute("data-id"),
          title: button.getAttribute("data-title"),
          price: button.getAttribute("data-price"),
          image: button.getAttribute("data-image"),
        };

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cart.some((item) => item.id === product.id)) {
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`${product.title} has been added to the cart!`);
        } else {
          alert(`${product.title} is already in the cart!`);
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });
