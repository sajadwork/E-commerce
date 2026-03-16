
import os

file_path = r'd:\E-commerce-web\frontend\src\index.css'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Fix 1: Product card title height and font size on mobile
    if 'font-size: 0.9rem;' in line and 'display: -webkit-box;' in lines[lines.index(line)+2]:
        new_lines.append(line.replace('font-size: 0.9rem;', 'font-size: 0.85rem;'))
        new_lines.append('        font-weight: 600;\n')
        continue
    if 'min-height:' not in lines[lines.index(line)] and 'overflow: hidden;' in line and 'margin-bottom: 4px;' in lines[lines.index(line)+1]:
        new_lines.append(line)
        new_lines.append('        min-height: 2.4em;\n')
        continue
    
    # Fix 2: Prevent wishlist icon cutoff/crowding
    if '.product-card .btn-wishlist,' in line and '.product-card .product-actions {' in lines[lines.index(line)+1]:
        # We'll replace the display: none if it's inside a media query (we'll look ahead)
        new_lines.append(line)
        continue

    new_lines.append(line)

# Let's just do a more robust block replacement for the mobile section
content = "".join(lines)

# Target block 1: Mobile product card fixes
old_block1 = """    .product-info h3 {
        font-size: 0.9rem;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 4px;
    }"""

new_block1 = """    .product-info h3 {
        font-size: 0.85rem;
        font-weight: 600;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 4px;
        min-height: 2.4em;
    }"""

# Target block 2: Wishlist display on mobile
old_block2 = """    .product-card .btn-wishlist,
    .product-card .product-actions {
        display: none;
    }"""

new_block2 = """    .product-card .btn-wishlist {
        top: 8px !important;
        right: 8px !important;
        width: 32px !important;
        height: 32px !important;
        font-size: 1rem !important;
        display: flex !important;
    }

    .product-card .product-actions {
        display: none;
    }"""

# Target block 3: Cart title wrap
old_block3 = """.page-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 32px;
}"""

new_block3 = """.page-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 32px;
}

@media (max-width: 600px) {
    .page-title {
        font-size: 1.5rem;
    }
}"""

# Try to replace with flexible whitespace/line-endings
def flex_replace(text, old, new):
    import re
    # Create an escaped version of 'old' but replace spaces/newlines with a flexible selector
    pattern = re.escape(old.strip()).replace(r'\ ', r'\s+').replace(r'\n', r'\s+')
    return re.sub(pattern, new, text)

content = flex_replace(content, old_block1, new_block1)
content = flex_replace(content, old_block2, new_block2)
content = flex_replace(content, old_block3, new_block3)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("CSS fixes applied successfully")
