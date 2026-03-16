const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'index.css');
let content = fs.readFileSync(filePath, 'utf16le'); // Read as UTF-16 first just in case
if (!content.includes('.hero-title')) {
    content = fs.readFileSync(filePath, 'utf8'); // It's probably UTF-8
}

// 1. Remove the mangled media queries at the end (anything after line 2193 or the auth-links block)
const authLinksEndIndex = content.indexOf('.auth-links a:hover {\r\n    opacity: 0.8;\r\n}');
if (authLinksEndIndex === -1) {
    const authLinksEndIndex2 = content.indexOf('.auth-links a:hover {\n    opacity: 0.8;\n}');
    if (authLinksEndIndex2 !== -1) {
        content = content.substring(0, authLinksEndIndex2 + 42); 
    }
} else {
    content = content.substring(0, authLinksEndIndex + 45);
}

// 2. Append the valid media queries
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

content = content + mediaQueries;

// 3. Make the visual replacements that failed earlier
const replacements = [
    {
        oldStr: ".hero-title {\r\n    font-size: 4.5rem;\r\n    font-weight: 700;\r\n    color: #fff;\r\n    max-width: 600px;\r\n    line-height: 1.05;\r\n    margin-bottom: 40px;\r\n    mix-blend-mode: difference;\r\n    /* Ensures text is visible on light/dark backgrounds */\r\n}",
        newStr: ".hero-title {\n    font-size: 4.5rem;\n    font-weight: 700;\n    font-family: var(--font-heading);\n    color: #fff;\n    max-width: 600px;\n    line-height: 1.1;\n    margin-bottom: 40px;\n    text-shadow: 0 4px 12px rgba(0,0,0,0.4);\n}"
    },
    {
        oldStr: ".hero-search {\r\n    pointer-events: auto;\r\n    background: white;\r\n    padding: 6px;\r\n    border-radius: var(--radius-full);\r\n    display: flex;\r\n    width: 100%;\r\n    max-width: 420px;\r\n    box-shadow: var(--shadow-lg);\r\n    transition: transform 0.2s;\r\n}",
        newStr: ".hero-search {\n    pointer-events: auto;\n    background: rgba(255, 255, 255, 0.85);\n    backdrop-filter: blur(16px);\n    -webkit-backdrop-filter: blur(16px);\n    padding: 8px;\n    border-radius: var(--radius-full);\n    display: flex;\n    width: 100%;\n    max-width: 480px;\n    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);\n    border: 1px solid rgba(255, 255, 255, 0.4);\n    transition: all var(--transition-normal);\n}"
    },
    {
        oldStr: ".category-card {\r\n    background: white;\r\n    padding: 24px;\r\n    border-radius: var(--radius-lg);\r\n    box-shadow: var(--shadow-sm);\r\n    position: sticky;\r\n    top: calc(var(--header-height) + 24px);\r\n}",
        newStr: ".category-card {\n    background: var(--glass-bg);\n    padding: 24px;\n    border-radius: var(--radius-xl);\n    box-shadow: var(--shadow-lg);\n    position: sticky;\n    top: calc(var(--header-height) + 24px);\n    backdrop-filter: blur(16px);\n    -webkit-backdrop-filter: blur(16px);\n    border: 1px solid var(--border-color);\n}"
    },
    {
        oldStr: ".product-card {\r\n    background: white;\r\n    border-radius: var(--radius-lg);\r\n    padding: 20px;\r\n    box-shadow: var(--shadow-sm);\r\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\r\n    display: flex;\r\n    flex-direction: column;\r\n    position: relative;\r\n    border: 1px solid transparent;\r\n}",
        newStr: ".product-card {\n    background: white;\n    border-radius: var(--radius-xl);\n    padding: 20px;\n    box-shadow: var(--shadow-md);\n    transition: all var(--transition-normal);\n    display: flex;\n    flex-direction: column;\n    position: relative;\n    border: 1px solid transparent;\n}"
    },
    {
        oldStr: ".product-card:hover {\r\n    transform: translateY(-8px);\r\n    box-shadow: var(--shadow-lg);\r\n    border-color: var(--border-color);\r\n}",
        newStr: ".product-card:hover {\n    transform: translateY(-8px);\n    box-shadow: var(--shadow-xl);\n    border-color: var(--border-color);\n}"
    }
];

replacements.forEach(({ oldStr, newStr }) => {
    // Try both \r\n and \n flavors
    if (content.includes(oldStr)) {
        content = content.replace(oldStr, newStr);
    } else {
        const lfStr = oldStr.replace(/\r\n/g, '\n');
        if (content.includes(lfStr)) {
            content = content.replace(lfStr, newStr);
        }
    }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully fixed index.css end lines and applied premium styles');
