const products = [
    {
      id: 0,
      title: "AMD Radeon™ RX 7700 XT",
      image: "../IMAGES/GPU/RX 7700XT/7700xt_1.webp",
      attributes: "GPU",
      price: 39.99,
      discountPrice: 29.99,
      category: "PC Essentials",
      type: "GPU",
      brand: "AMD",
      description: "The AMD Radeon™ RX 7700 XT desktop graphics card is designed for next-generation gaming and streaming experiences at 1440p."
    },
    {
      id: 1,
      title: "Mechanical Keyboard",
      image: "../IMAGES/keyboard.jpg",
      attributes: "Blue Switches, Backlit",
      price: 89.99,
      discountPrice: 89.99,
      category: "Peripherals",
      type: "Keyboard",
      brand: "Corsair",
      description: "Tactile mechanical keys with RGB backlighting."
    },
    {
      id: 2,
      title: "1080p Monitor",
      image: "../IMAGES/monitor.jpg",
      attributes: "24 inch, IPS",
      price: 129.99,
      discountPrice: 99.99,
      category: "Peripherals",
      type: "Monitor",
      brand: "Dell",
      description: "Crisp Full HD display with vivid colors and fast refresh rate."
    },
    {
      id: 3,
      title: "AMD Ryzen 5 5600X",
      image: "../IMAGES/cpu.jpg",
      attributes: "6-Core, 12-Thread",
      price: 199.99,
      discountPrice: 179.99,
      category: "PC Essentials",
      type: "CPU",
      brand: "AMD",
      description: "High-efficiency processor ideal for gaming and productivity."
    },
    {
      id: 4,
      title: "Intel Core i5-12400",
      image: "../IMAGES/cpu_intel.jpg",
      attributes: "6-Core, 12-Thread",
      price: 209.99,
      discountPrice: 189.99,
      category: "PC Essentials",
      type: "CPU",
      brand: "Intel",
      description: "Powerful Intel CPU with balanced performance for all tasks."
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);

  if (product) {
    // Breadcrumb update
    document.getElementById('breadcrumb-title').textContent = product.title;
    const catLink = document.getElementById('breadcrumb-category');
    catLink.textContent = product.category;
    catLink.href = `category.html?category=${encodeURIComponent(product.category)}`;

    // Product info
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-brand').textContent = product.brand;
    document.getElementById('product-price').innerHTML = product.discountPrice < product.price
      ? `<span style="text-decoration: line-through; color: gray;">₱${product.price.toFixed(2)}</span> <span style="color: red;">₱${product.discountPrice.toFixed(2)}</span>`
      : `₱${product.price.toFixed(2)}`;
    document.getElementById('main-image').style.backgroundImage = `url('${product.image}')`;
    document.getElementById('product-description').textContent = product.description;

    // Thumbnails
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.innerHTML = ""; // Clear existing thumbnails
    for (let i = 0; i < 3; i++) {
      const thumb = document.createElement('div');
      thumb.className = 'thumbnail';
      thumb.style.backgroundImage = `url('${product.image}')`;
      thumb.addEventListener('click', () => {
        document.getElementById('main-image').style.backgroundImage = thumb.style.backgroundImage;
      });
      thumbnails.appendChild(thumb);
    }

    // Alternatives
    const altContainer = document.getElementById('alt-products');
    altContainer.innerHTML = ""; // Clear existing
    products.filter(p => p.id !== id).slice(0, 5).forEach(alt => {
      const altDiv = document.createElement('a');
      altDiv.href = `product.html?id=${alt.id}`;
      altDiv.className = 'alt-product';
      altDiv.style.backgroundImage = `url('${alt.image}')`;
      altContainer.appendChild(altDiv);
    });

    // Quantity buttons
    document.getElementById('increase').addEventListener('click', () => {
      let qty = parseInt(document.getElementById('quantity').value);
      document.getElementById('quantity').value = qty + 1;
    });

    document.getElementById('decrease').addEventListener('click', () => {
      let qty = parseInt(document.getElementById('quantity').value);
      if (qty > 1) document.getElementById('quantity').value = qty - 1;
    });

  } else {
    // Graceful fallback if product not found
    document.querySelector('.product-detail').innerHTML = `
      <p style="font-size: 20px; color: red;">Product not found.</p>
    `;
    document.getElementById('breadcrumb-title').textContent = "Not Found";
    const catLink = document.getElementById('breadcrumb-category');
    catLink.textContent = "Unknown";
    catLink.removeAttribute('href');
  }
