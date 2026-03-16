
import os

file_path = r'd:\E-commerce-web\frontend\src\index.css'
temp_path = r'd:\E-commerce-web\frontend\src\index.css.tmp'

marker = '.auth-links a:hover {'
found_marker = False
count_braces = 0

with open(file_path, 'r', encoding='utf-8') as fin, open(temp_path, 'w', encoding='utf-8') as fout:
    for line in fin:
        fout.write(line)
        if marker in line:
            found_marker = True
        
        if found_marker:
            count_braces += line.count('{')
            count_braces -= line.count('}')
            if count_braces == 0 and '}' in line:
                # We found the end of the block.
                # Stop original writing and append the new content.
                break

    new_content = """
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
"""
    fout.write(new_content)

os.replace(temp_path, file_path)
print("CSS fixed successfully")
