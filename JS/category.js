const products = [
    {
      id: 0,
      title: "Gaming Mouse",
      image: "images/mouse.jpg",
      attributes: "RGB, 16000 DPI",
      price: 39.99,
      discountPrice: 29.99,
      category: "Peripherals",
      type: "Mouse",
      brand: "Logitech"
    },
    {
      id: 1,
      title: "Mechanical Keyboard",
      image: "images/keyboard.jpg",
      attributes: "Blue Switches, Backlit",
      price: 89.99,
      discountPrice: 89.99,
      category: "Peripherals",
      type: "Keyboard",
      brand: "Corsair"
    },
    {
      id: 2,
      title: "1080p Monitor",
      image: "images/monitor.jpg",
      attributes: "24 inch, IPS",
      price: 129.99,
      discountPrice: 99.99,
      category: "Peripherals",
      type: "Monitor",
      brand: "Dell"
    },
    {
      id: 3,
      title: "AMD Ryzen 5 5600X",
      image: "images/cpu.jpg",
      attributes: "6-Core, 12-Thread",
      price: 199.99,
      discountPrice: 179.99,
      category: "PC Essentials",
      type: "CPU",
      brand: "AMD"
    },
    {
      id: 4,
      title: "Intel Core i5-12400",
      image: "images/cpu_intel.jpg",
      attributes: "6-Core, 12-Thread",
      price: 209.99,
      discountPrice: 189.99,
      category: "PC Essentials",
      type: "CPU",
      brand: "Intel"
    }
  ];

  const grid = document.querySelector('.product-grid');
  const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
  const filterTagContainer = document.getElementById('active-filters');

  function getSelectedFilters() {
    const selected = {
      category: [],
      type: [],
      brand: []
    };

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const label = checkbox.parentElement.textContent.trim();
        if (["PC Essentials", "Peripherals"].includes(label)) {
          selected.category.push(label);
        } else if (["CPU", "Motherboard", "RAM", "GPU", "SSD", "HDD", "PSU", "Casing", "CPU Cooler", "Fan", "Mouse", "Keyboard", "Monitor"].includes(label)) {
          selected.type.push(label);
        } else {
          selected.brand.push(label);
        }
      }
    });

    return selected;
  }

  function renderActiveFilters() {
    filterTagContainer.innerHTML = '';
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const label = checkbox.parentElement.textContent.trim();
        const tag = document.createElement('button');
        tag.className = 'filter-tag';
        tag.textContent = `${label} ✕`;
        tag.addEventListener('click', () => {
          checkbox.checked = false;
          renderProducts();
        });
        filterTagContainer.appendChild(tag);
      }
    });
  }

  function renderProducts() {
    const filters = getSelectedFilters();
    renderActiveFilters();

    grid.innerHTML = '';

    const filtered = products.filter(product => {
      const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);
      const matchesType = filters.type.length === 0 || filters.type.includes(product.type);
      const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand);
      return matchesCategory && matchesType && matchesBrand;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<p>No products match the selected filters.</p>';
      return;
    }

    filtered.forEach(product => {
      const card = document.createElement('a');
      card.className = 'product-card';
      card.href = `product.html?id=${product.id}`;

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
  }

  checkboxes.forEach(cb => cb.addEventListener('change', renderProducts));
  renderProducts();

document.getElementById('clear-filters').addEventListener('click', (e) => {
  e.preventDefault();
  checkboxes.forEach(cb => cb.checked = false);
  renderProducts();
});

renderProducts();