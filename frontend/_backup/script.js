document.addEventListener('DOMContentLoaded', () => {

    // Product Data
    const products = [
        {
            id: 1,
            name: "Phone Holder Sakti",
            category: "Other",
            price: 29.90,
            rating: 4.5,
            reviews: 120,
            image: "images/product_phone_holder.png",
            tag: "Best Seller"
        },
        {
            id: 2,
            name: "Headsound",
            category: "Music",
            price: 12.00,
            rating: 4.8,
            reviews: 85,
            image: "images/product_headsound.png",
            tag: "New"
        },
        {
            id: 3,
            name: "Adudu Cleaner",
            category: "Home",
            price: 50.00,
            rating: 4.6,
            reviews: 210,
            image: "images/product_cleaner.png",
            tag: "Sale"
        },
        {
            id: 4,
            name: "CCTV Maling",
            category: "Security",
            price: 9.90,
            rating: 4.2,
            reviews: 55,
            image: "images/product_cleaner.png", // Reusing for demo as we have limit on generation
            tag: "Pro"
        },
        {
            id: 5,
            name: "Stuffus Peker 32",
            category: "Tools",
            price: 34.10,
            rating: 4.7,
            reviews: 140,
            image: "images/product_phone_holder.png", // Reuse
            tag: "Hot"
        },
        {
            id: 6,
            name: "Stuffus R175",
            category: "Home",
            price: 99.00,
            rating: 4.9,
            reviews: 300,
            image: "images/product_headsound.png", // Reuse
            tag: "Top"
        }
    ];

    const recommendations = [
        {
            id: 7,
            name: "TWS Earbuds",
            price: 45.00,
            image: "images/product_headsound.png" // Reuse
        },
        {
            id: 8,
            name: "Smart Piano",
            price: 450.00,
            image: "images/product_phone_holder.png" // Reuse
        },
        {
            id: 9,
            name: "Vacuum Pro",
            price: 120.00,
            image: "images/product_cleaner.png" // Reuse
        },
        {
            id: 10,
            name: "Air Purifier",
            price: 89.00,
            image: "images/product_cleaner.png" // Reuse
        }
    ];

    // DOM Elements
    const productGrid = document.getElementById('productGrid');
    const recommendationGrid = document.getElementById('recommendationGrid');

    // Helper: Generate Star Rating HTML
    function getStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.round(rating)) {
                stars += '<i class="ph-fill ph-star"></i>';
            } else {
                stars += '<i class="ph ph-star"></i>';
            }
        }
        return stars;
    }

    // Render Products
    function renderProducts() {
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-tag">${product.category}</div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">${getStarRating(product.rating)}</span>
                        <span>(${product.reviews})</span>
                    </div>
                </div>
                <div class="product-footer">
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn-add"><i class="ph ph-shopping-bag"></i></button>
                        <button class="btn-buy">Buy Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render Recommendations
    function renderRecommendations() {
        recommendationGrid.innerHTML = recommendations.map(item => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="product-info">
                    <h3>${item.name}</h3>
                </div>
                <div class="product-footer">
                    <div class="price">$${item.price.toFixed(2)}</div>
                    <button class="btn-add"><i class="ph ph-plus"></i></button>
                </div>
            </div>
        `).join('');
    }

    // Initialize
    renderProducts();
    renderRecommendations();

    // Event Listeners related to UI (Buttons)
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function () {
            alert('Added to cart!');
        });
    });

    // Simple Filter Toggle (Visual only for now)
    const categoryItems = document.querySelectorAll('.category-list li');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

});
