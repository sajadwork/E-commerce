import sys

file_path = 'd:/E-commerce-web/frontend/src/index.css'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (
        ".hero-bg::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 50%);\n}",
        ".hero-bg::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);\n}"
    ),
    (
        ".hero-title {\n    font-size: 4.5rem;\n    font-weight: 700;\n    color: #fff;\n    max-width: 600px;\n    line-height: 1.05;\n    margin-bottom: 40px;\n    mix-blend-mode: difference;\n    /* Ensures text is visible on light/dark backgrounds */\n}",
        ".hero-title {\n    font-size: 4.5rem;\n    font-weight: 700;\n    font-family: var(--font-heading);\n    color: #fff;\n    max-width: 600px;\n    line-height: 1.1;\n    margin-bottom: 40px;\n    text-shadow: 0 4px 12px rgba(0,0,0,0.4);\n}"
    ),
    (
        ".hero-search {\n    pointer-events: auto;\n    background: white;\n    padding: 6px;\n    border-radius: var(--radius-full);\n    display: flex;\n    width: 100%;\n    max-width: 420px;\n    box-shadow: var(--shadow-lg);\n    transition: transform 0.2s;\n}",
        ".hero-search {\n    pointer-events: auto;\n    background: rgba(255, 255, 255, 0.85);\n    backdrop-filter: blur(16px);\n    -webkit-backdrop-filter: blur(16px);\n    padding: 8px;\n    border-radius: var(--radius-full);\n    display: flex;\n    width: 100%;\n    max-width: 480px;\n    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);\n    border: 1px solid rgba(255, 255, 255, 0.4);\n    transition: all var(--transition-normal);\n}"
    ),
    (
        ".category-card {\n    background: white;\n    padding: 24px;\n    border-radius: var(--radius-lg);\n    box-shadow: var(--shadow-sm);\n    position: sticky;\n    top: calc(var(--header-height) + 24px);\n}",
        ".category-card {\n    background: var(--glass-bg);\n    padding: 24px;\n    border-radius: var(--radius-xl);\n    box-shadow: var(--shadow-lg);\n    position: sticky;\n    top: calc(var(--header-height) + 24px);\n    backdrop-filter: blur(16px);\n    -webkit-backdrop-filter: blur(16px);\n    border: 1px solid var(--border-color);\n}"
    ),
    (
        ".product-card {\n    background: white;\n    border-radius: var(--radius-lg);\n    padding: 20px;\n    box-shadow: var(--shadow-sm);\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n    display: flex;\n    flex-direction: column;\n    position: relative;\n    border: 1px solid transparent;\n}",
        ".product-card {\n    background: white;\n    border-radius: var(--radius-xl);\n    padding: 20px;\n    box-shadow: var(--shadow-md);\n    transition: all var(--transition-normal);\n    display: flex;\n    flex-direction: column;\n    position: relative;\n    border: 1px solid transparent;\n}"
    ),
    (
        ".product-card:hover {\n    transform: translateY(-8px);\n    box-shadow: var(--shadow-lg);\n    border-color: var(--border-color);\n}",
        ".product-card:hover {\n    transform: translateY(-8px);\n    box-shadow: var(--shadow-xl);\n    border-color: var(--border-color);\n}"
    )
]

modified = False
for old, new in replacements:
    old_rn = old.replace('\n', '\r\n')
    if old in content:
        content = content.replace(old, new)
        modified = True
        print(f"Replaced {old[:30]}...")
    elif old_rn in content:
        content = content.replace(old_rn, new)
        modified = True
        print(f"Replaced {old_rn[:30]}...")
    else:
        print(f"NOT FOUND: {old[:30]}...")

if modified:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        print("File successfully saved.")
