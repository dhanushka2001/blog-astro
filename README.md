# Personal blog

[![Deploy](https://github.com/dhanushka2001/blog-astro/actions/workflows/deploy.yml/badge.svg?label=Deploy)](https://github.com/dhanushka2001/blog-astro/actions)

In development

## 🚀 Live Site

This blog is built from **this** repository and deployed using the [`dhanushka2001/dhanushka2001.github.io`](https://github.com/dhanushka2001/dhanushka2001.github.io) repository to **GitHub Pages** @ [`dhanushka2001.github.io`](https://dhanushka2001.github.io)

## Inspirations:

- **David Li's blog ([Website](https://friendlyuser.github.io/) | [GitHub](https://github.com/FriendlyUser/astro-tech-blog)) (Tailwind Astro) (FORKED)**
- Nguyễn Tạ Minh Trung's blog ([Website](https://trungtmnguyen.com/) | [GitHub](https://github.com/trungntm/trungtmnguyen.com)) (Tailwind Next.js)
- Homing So's blog ([Website](https://homing.so/) | [GitHub](https://github.com/hominsu/blog)) (Tailwind Next.js)

## Updates

<details><summary>Adding author avatar and multiple authors to blogs</summary>

* David Li's blog displays the author name and publication date on the same line using this code inside ``src/partials/BlogPost.tsx``:

  ```tsx
  <div className="mt-2 text-center text-sm text-gray-400">
    By {AppConfig?.author} on {props?.frontmatter?.pubDate}
  ```
  
  ![image](https://github.com/user-attachments/assets/55b2f6a2-19f9-4fcb-96b0-1a694d5878d4)

* I wanted to display a small circular avatar next to the author's name, and allow for multiple authors. I also wanted to put the publication date on a separate line, as well as an updated date if the blog was updated later.

  To support multiple authors, I created a ``src/utils/authors.ts`` file:

  ```ts
  export const authors = {
    'David Li': {
      name: 'David Li',
      avatar: '/assets/images/avatars/david.png',
      url: 'https://davidli.com', // optional
    },
    'Dhanushka Jayagoda': {
      name: 'Dhanushka Jayagoda',
      avatar: '/assets/images/avatars/dhanushka.png',
      url: 'https://github.com/dhanushka2001', // optional
    },
    // Add more authors here
  };
  ```

  what the frontmatter of a ``.md`` blog now looks like:

  ```md
  ---
  title: How to use Rust's macros
  description: In this article, we will explore Rust's macros and build a program that demonstrates their usage.
  pubDate: Saturday, 27 December 2024 13:00:00 GMT
  updateDate: 2024-12-28
  tags: ["rust", "ffi"]
  layout: '@/templates/BasePost.astro'
  imgSrc: '/imgs/2023/117117315.png'
  authors: [David Li, Dhanushka Jayagoda]
  ---
  ```

  And updating ``BlogPost.tsx`` like so:
  
  ```tsx
  <div className="text-center text-sm text-gray-400">
    <div className="mt-1">
      Published:{' '}
      {new Date(props.frontmatter.pubDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
      {props.frontmatter.updateDate && (
        <>
          {' '}
          · Updated:{' '}
          {new Date(props.frontmatter.updateDate).toLocaleDateString(
            undefined,
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }
          )}
        </>
      )}
    </div>
    <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
      {props.frontmatter.authors?.map((name, idx) => {
        const author = AuthorMap[name] || {
          name,
          avatar: '/assets/images/avatars/default.jpg',
        };
  
        return (
          <div key={idx} className="flex items-center space-x-2">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-6 w-6 rounded-full object-cover"
              loading="lazy"
            />
            {author.url ? (
              <a
                href={author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {author.name}
              </a>
            ) : (
              <span>{author.name}</span>
            )}
          </div>
        );
      })}
    </div>
  ```

  The result:

  ![image](https://github.com/user-attachments/assets/96b5c317-61b4-493a-90f7-7c820434235e)

</details>

<details><summary>Adding David Li as author to all .md blogs using a Python script</summary>

  * The frontmatter for David Li's ``.md`` blog files did not list the author; it just used the author listed in ``/src/utils/AppConfig.ts`` as a single global author for all blogs. To change this and give each blog its own unique author(s), I needed to add an author category to the frontmatter of all the ``.md`` blog files. As David Li wrote all of the blogs, this just meant adding:

    ```md
    authors: [David Li]
    ```

    to the frontmatter of every ``.md`` file. To do this, I used this Python script:

    ```python
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
    ```

    which recursively goes through every ``.md`` file in all subdirectories of ``/src/pages/posts/`` and adds ``authors: [David Li]`` to the end of the frontmatter.
  
</details>

<details><summary>Adding giscus github comments and reactions</summary>

  * One thing I really wanted to add which David Li's blog didn't have was comments. To add comments and reactions at the end of blogs, I used [``giscus``](https://giscus.app/), which does this using GitHub Discussions. The steps are as follows:

  1. Install ``giscus`` with yarn:

     ```console
     yarn add @giscus/react
     ```

  2. In ``src/partials/BlogPost.tsx``:

     * Import ``giscus`` at the top:
    
       ```tsx
       import Giscus from '@giscus/react';
       ```

     * Add this near to the end, entering the data that ``giscus`` gives after setting it up:
    
       ```tsx
       <Giscus
          id="comments"
          repo="..."
          repoId="..."
          category="..."
          categoryId="..."
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="preferred_color_scheme"
          lang="en"
          loading="lazy"
        />
       ```
  
     * Replace this line at the end with this:
        
       ```diff
       - export { BlogPost };
       + export default BlogPost;
       ```

       This allows Astro to hydrate it correctly. Since we're using ``BlogPost`` inside ``BasePost.astro``, and this ``.astro`` file is rendering a React component with interactivity (Giscus), you need to hydrate the ``BlogPost`` component properly using Astro's client directives.
       
  3. In ``src/templates/BasePost.astro``:

     Change these lines:

     ```diff
     - import { BlogPost } from '@/partials/BlogPost';
     + import BlogPost from '@/partials/BlogPost.tsx';
     ```

     Need to use default export for ``client:*`` to work.

     ```diff
     - <BlogPost frontmatter={content}>
     + <BlogPost client:load frontmatter={content}>
     ```

     Hydrate the component using ``client:load``.

  * The result:     

    ![image](https://github.com/user-attachments/assets/929104d7-7060-48f0-987d-0024e47df951)

</details>

<details><summary>Using grep and find</summary>

  * For many situations, I wanted to find which files contained a specific word/string. The perfect tool for this is the Unix command-line tool [``grep``](https://en.wikipedia.org/wiki/Grep). There's much more you can do with ``grep`` which you can find in this [article](https://www.digitalocean.com/community/tutorials/grep-command-in-linux-unix), but the command I used was:

    ```zsh
    grep -r "<string-name>" *
    ```

    which searches for a string recursively in all files in all subdirectories of the current directory.

  * If instead you want to find all files with a filename that contains a certain word/string, then you need to use the Unix command-line tool [``find``](https://en.wikipedia.org/wiki/Find_(Unix)) instead of ``grep``. The command I used was:

    ```zsh
    find -name '*<string-name>*'
    ```

    which I found from [this](https://stackoverflow.com/a/40612754) Stack Overflow answer.
  
</details>
