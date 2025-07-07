import os

def update_frontmatter(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    if not lines or lines[0].strip() != '---':
        return  # No frontmatter

    # Find where frontmatter ends
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            end_index = i
            break
    else:
        return  # No closing '---'

    # Check if authors already exists
    frontmatter_lines = lines[:end_index]
    if any('authors:' in line for line in frontmatter_lines):
        return  # Already has authors

    # Insert authors before closing '---'
    frontmatter_lines.append("authors: [David Li]\n")
    new_lines = frontmatter_lines + lines[end_index:]
    
    with open(filepath, 'w', encoding='utf-8') as file:
        file.writelines(new_lines)

def walk_and_update(directory):
    for root, _, files in os.walk(directory):
        for filename in files:
            if filename.endswith('.md'):
                filepath = os.path.join(root, filename)
                update_frontmatter(filepath)
    print("Done.")

# Replace this with the path to your blog folder
walk_and_update("../src/pages/posts")
