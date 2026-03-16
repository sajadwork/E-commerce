
import fs from 'fs';
const filePath = 'd:/E-commerce-web/frontend/src/index.css';

const marker = '.auth-links a:hover {';
let content = fs.readFileSync(filePath, 'utf8');

const lastIndex = content.lastIndexOf(marker);
if (lastIndex === -1) {
    console.error('Marker not found');
    process.exit(1);
}

const closingBraceIndex = content.indexOf('}', lastIndex);
if (closingBraceIndex === -1) {
    console.error('Closing brace not found');
    process.exit(1);
}

// Keep everything up to the closing brace
const validContent = content.substring(0, closingBraceIndex + 1);

const mediaQueries = `

/* Media Queries for Mobile Responsiveness */
@media (max-width: 1024px) {
    .main-layout {
        grid-template-columns: 240px 1fr;
        gap: 32px;
    }
    .product-grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}

@media (max-width: 768px) {
    :root {
        --header-height: 64px;
    }
    .main-layout {
        grid-template-columns: 1fr;
    }
    .sidebar {
        display: none;
    }
    .hero {
        height: 480px;
    }
    .hero-title {
        font-size: 3rem;
    }
    .hero-search {
        max-width: 100%;
    }
    .product-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 16px;
    }
    h1 {
        font-size: 2.5rem;
    }
    h2 {
        font-size: 2rem;
    }
    .nav-links {
        display: none;
    }
}

@media (max-width: 480px) {
    .product-grid {
        grid-template-columns: 1fr !important;
    }
    .hero-title {
        font-size: 2.25rem;
    }
    .hero {
        height: 400px;
    }
    .container {
        padding: 0 16px;
    }
    .page-btn {
        width: 36px;
        height: 36px;
    }
    .cta-banner {
        flex-direction: column;
        text-align: center;
        padding: 32px 20px;
    }
    .email-signup {
        flex-direction: column;
        width: 100%;
    }
    .email-signup button {
        width: 100%;
        margin-top: 12px;
    }
}
`;

fs.writeFileSync(filePath, validContent + mediaQueries, 'utf8');
console.log('CSS fixed successfully using Node.js ESM');
