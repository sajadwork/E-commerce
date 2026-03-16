
const fs = require('fs');
const path = require('path');

const filePath = 'd:\\E-commerce-web\\frontend\\src\\index.css';

let content = fs.readFileSync(filePath, 'utf8');

// Target block 1: Mobile product card fixes
const oldBlock1 = `    .product-info h3 {
        font-size: 0.9rem;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 4px;
    }`;

const newBlock1 = `    .product-info h3 {
        font-size: 0.85rem;
        font-weight: 600;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 4px;
        min-height: 2.4em;
    }`;

// Target block 2: Wishlist display on mobile
const oldBlock2 = `    .product-card .btn-wishlist,
    .product-card .product-actions {
        display: none;
    }`;

const newBlock2 = `    .product-card .btn-wishlist {
        top: 8px !important;
        right: 8px !important;
        width: 32px !important;
        height: 32px !important;
        font-size: 1rem !important;
        display: flex !important;
    }

    .product-card .product-actions {
        display: none;
    }`;

// Target block 3: Cart title wrap
const oldBlock3 = `.page-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 32px;
}`;

const newBlock3 = `.page-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 32px;
}

@media (max-width: 600px) {
    .page-title {
        font-size: 1.5rem;
    }
}`;

function flexReplace(text, oldText, newText) {
    // Escape special regex characters
    const escapedOld = oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\s+/g, '\\s+');
    const regex = new RegExp(escapedOld, 'g');
    return text.replace(regex, newText);
}

content = flexReplace(content, oldBlock1, newBlock1);
content = flexReplace(content, oldBlock2, newBlock2);
content = flexReplace(content, oldBlock3, newBlock3);

fs.writeFileSync(filePath, content, 'utf8');
console.log('CSS fixes applied successfully via Node.js');
