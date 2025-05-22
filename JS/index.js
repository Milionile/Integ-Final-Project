  const products = [
    {
      "id": 0,
      "title": "AMD Radeon RX 7700 XT",
      "image": "IMAGES/GPU/RX 7700XT/7700xt_1.webp",
      "attributes": "GPU",
      "price": 39.99,
      "discountPrice": 29.99
    },
    {
      "id": 1,
      "title": "Mechanical Keyboard",
      "image": "images/keyboard.jpg",
      "attributes": "Blue Switches, Backlit",
      "price": 89.99,
      "discountPrice": 89.99
    },
    {
      "id": 2,
      "title": "1080p Monitor",
      "image": "images/monitor.jpg",
      "attributes": "24 inch, IPS",
      "price": 129.99,
      "discountPrice": 99.99
    },
    {
      "id": 2,
      "title": "1080p Monitor",
      "image": "images/monitor.jpg",
      "attributes": "24 inch, IPS",
      "price": 129.99,
      "discountPrice": 99.99
    },
    {
      "id": 2,
      "title": "1080p Monitor",
      "image": "images/monitor.jpg",
      "attributes": "24 inch, IPS",
      "price": 129.99,
      "discountPrice": 99.99
    },
    {
      "id": 2,
      "title": "1080p Monitor",
      "image": "images/monitor.jpg",
      "attributes": "24 inch, IPS",
      "price": 129.99,
      "discountPrice": 99.99
    },
    {
      "id": 2,
      "title": "1080p Monitor",
      "image": "images/monitor.jpg",
      "attributes": "24 inch, IPS",
      "price": 129.99,
      "discountPrice": 99.99
    }
  ];

  const grid = document.querySelector('.product-grid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('a');
    card.className = 'product-card';
    card.href = `HTMLS/product.html?id=${product.id}`;

    const hasDiscount = product.discountPrice && product.discountPrice < product.price;

    card.innerHTML = `
      <div class="product-image" style="background-image: url('${product.image}'); background-size: cover;"></div>
      <div class="product-title">${product.title}</div>
      <div class="product-attributes">${product.attributes}</div>
      <div class="product-price">
        ${hasDiscount
          ? `<span class="old-price">₱${product.price.toFixed(2)}</span> 
             <span class="discounted-price">₱${product.discountPrice.toFixed(2)}</span>`
          : `₱${product.price.toFixed(2)}`
        }
      </div>
    `;

    grid.appendChild(card);
  });

  function selectProduct(id) {
    localStorage.setItem("selectedProductId", id);
    window.location.href = "HTMLS/product.html";
  }