# Personal blog

[![Deploy](https://github.com/dhanushka2001/blog-astro/actions/workflows/deploy.yml/badge.svg?label=Deploy)](https://github.com/dhanushka2001/blog-astro/actions)

[![Astro](https://img.shields.io/badge/Astro-%232C2052.svg?style=plastic&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=plastic&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=plastic&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<!--
[![Astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
-->

In development

## 🚀 Live Site

This blog is built from **this** repository and deployed using the [`dhanushka2001/dhanushka2001.github.io`](https://github.com/dhanushka2001/dhanushka2001.github.io) repository to **GitHub Pages** @ [`dhanushka2001.github.io`](https://dhanushka2001.github.io)

## Inspirations:

- **David Li's blog ([Website](https://friendlyuser.github.io/) | [GitHub](https://github.com/FriendlyUser/astro-tech-blog)) (Tailwind Astro) (FORKED)**
- Nguyễn Tạ Minh Trung's blog ([Website](https://trungtmnguyen.com/) | [GitHub](https://github.com/trungntm/trungtmnguyen.com)) (Tailwind Next.js)
- Homing So's blog ([Website](https://homing.so/) | [GitHub](https://github.com/hominsu/blog)) (Tailwind Next.js)

## Progress update 1 - 07/07/25

<details><summary>Author avatar, multiple authors, and blog update date</summary>

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

## Progress update 2 - 08/07/25

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

## Progress update 3 - 11/07/25 

<details><summary>Scroll-to-top/comments buttons</summary>

  * I also borrowed the code for the scroll to top/comments buttons from [Trung's blog](https://trungtmnguyen.com/). The code can be found on [Trung's GitHub](https://github.com/trungntm/trungtmnguyen.com). I will paste the code below:

    ```tsx
    'use client';
    
    import { useEffect, useState } from 'react';
    
    const ScrollButtons = () => {
      const [show, setShow] = useState(false);
    
      useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
      }, []);
    
      return (
        <div
          className={`fixed bottom-8 right-8 z-50 flex flex-col gap-3 ${
            show ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="rounded-full bg-gray-200 p-2 text-gray-600 shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
    
          <button
            onClick={() => {
              const el = document.getElementById('comments');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Scroll to comments"
            className="rounded-full bg-gray-200 p-2 text-gray-600 shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      );
    };
    
    export default ScrollButtons;
    ```

  * I made some changes from Trung's implementation. The scroll-to-top button in Trung's blog is **below** the scroll-to-comments button, and also, the buttons are disabled on mobile for Trung's website. In my implementation, the scroll-to-top button is **above** the scroll-to-comments button, and the buttons are also visible/usable on mobile.

    <img width="529" height="500" alt="scroll-buttons" src="https://github.com/user-attachments/assets/f8e387a4-1106-4660-ae69-a6f4f192f6e6" />

</details>

<details><summary>Prev/next footer links</summary>

  * Added prev/next footer links to the blog like in [Trung's blog](https://trungtmnguyen.com/) by adding this code to ``BasePost.astro``:

    ```astro
    const allPosts = await Astro.glob<CustomIFrontMatter>('../pages/posts/**/*.md'); // adjust path if needed
    const sortedPosts = allPosts.sort(
      (a, b) => new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime()
    );
    
    const currentSlug = Astro.url.pathname.replace(/\/+$/, '').split('/').pop();
    const currentIndex = sortedPosts.findIndex((p) => {
      const slug = p.url.replace(/\/+$/, '').split('/').pop();
      return slug === currentSlug;
    });
    
    const prev = sortedPosts[currentIndex + 1];
    const next = sortedPosts[currentIndex - 1];

    <Base head={{ title, description: content.description }}>
      ...
        
      {/*
      <BottomSection />
      */}
      {(prev || next) && (
      <div class="mx-auto mt-5 max-w-prose flex justify-between gap-4 border-t border-gray-700 pt-8 text-sm text-gray-400 dark:text-gray-500">
          {prev && (
            <div class="w-full sm:w-[48%] xl:w-auto">
              <div class="text-xs uppercase">Previous</div>
              <a class="text-blue-400 hover:underline" href={prev.url}>
                {prev.frontmatter.title}
              </a>
            </div>
          )}
          {next && (
            <div class="text-right w-full sm:w-[48%] xl:w-auto">
              <div class="text-xs uppercase">Next</div>
              <a class="text-blue-400 hover:underline" href={next.url}>
    	    {next.frontmatter.title}
    	  </a>
            </div>
          )}
        </div>
      )}
      
      <div class="mt-6 text-center">
        <a href="/posts" class="text-blue-400 hover:underline text-sm">
          &larr; Back to blog
        </a>
      </div>
    
      <ScrollButtons client:load />
    
    </Base>
    ```

    <img width="481" height="265" alt="image" src="https://github.com/user-attachments/assets/aca7e58e-8fb5-4ec8-871e-66ed8878356b" />

</details>

## Progress update 4 - 15/07/25

<details><summary>Scroll indicator (progress bar)</summary>

  * I borrowed the scroll indicator (progress bar) from [Trung's blog](https://trungtmnguyen.com/). The code can be found on [Trung's GitHub](https://github.com/trungntm/trungtmnguyen.com), I will paste it below as well as what needs to be installed:

    ```console
    yarn add framer-motion
    ```
  
    ``src/partials/ScrollIndicator.tsx``:
  
    ```tsx
    'use client';
    
    import { motion, useScroll } from 'framer-motion';
    
    interface ScrollIndicatorProps {
      backgroundColor?: string;
    }
    
    export const ScrollIndicator = ({
      backgroundColor = '#2DB7B9',
    }: ScrollIndicatorProps) => {
      const { scrollYProgress } = useScroll();
    
      return (
        <motion.div
          id="scroll-indicator"
          style={{
            scaleX: scrollYProgress,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            originX: 0,
            zIndex: 100,
            backgroundColor,
          }}
        />
      );
    };
    ```

    <img width="537" height="916" alt="image" src="https://github.com/user-attachments/assets/9a16deb5-4cf3-4faf-ab67-cc803f3e151e" />

</details>

<details><summary>Update Astro v4→v5</summary>

* I have updated from Astro v4->v5, and I am using Astro's content collections for better schema validation, frontmatter typing, and consistency. Here is ``src/content/config.ts``:
 
    ```ts
    import { defineCollection, z } from 'astro:content';
    
    const posts = defineCollection({
      type: 'content',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.preprocess(
          (val) => (typeof val === 'string' ? new Date(val) : val),
          z.date()
        ),
        updateDate: z.preprocess(
          (val) => (typeof val === 'string' ? new Date(val) : val),
          z.date().optional()
        ),
        tags: z.array(z.string()).optional(),
        authors: z.array(z.string()).optional(),
        imgSrc: z.string().optional(),
        imgAlt: z.string().optional(),
      }),
    });
    
    export const collections = {
      posts,
    };
    ```

</details>

## Progress update 5 - 23/08/25

<details><summary>Estimated reading time</summary>

  * I was stuck trying to implement this feature for a month; it worked in localhost but didn't seem to work in the actual (Github-hosted) website, although now I think the issue was likely that I just didn't wait long enough for the changes to display... **Some changes don't appear immediately and may take ~2 minutes!**
  * The guide to add estimated reading time can be found on the official Astro docs [here](https://docs.astro.build/en/recipes/reading-time/). I will provide the steps below:

  * Step 1: Install Helper Packages

    ```console
    yarn add reading-time mdast-util-to-string
    ```
    
    * ``reading-time``: to calculate minutes read
    * ``mdast-util-to-string``: to extract all text from your markdown

  * Step 2: Create a remark plugin.

    This plugin uses the ``mdast-util-to-string`` package to get the Markdown file’s text. This text is then passed to the ``reading-time`` package to calculate the reading time in minutes.

    ``remark-reading-time.mjs``:

    ```mjs
    import getReadingTime from 'reading-time';
    import { toString } from 'mdast-util-to-string';
    
    export function remarkReadingTime() {
      return function (tree, { data }) {
        const textOnPage = toString(tree);
        const readingTime = getReadingTime(textOnPage);
        // readingTime.text will give us minutes read as a friendly string,
        // i.e. "3 min read"
        data.astro.frontmatter.minutesRead = readingTime.text;
      };
    }
    ```
  
  * Step 3: Add the plugin to your config:

    ``astro.config.mjs``:

    ```mjs
    import { defineConfig } from 'astro/config';
    import { remarkReadingTime } from './remark-reading-time.mjs';
    ...
    
    export default defineConfig({
      ...
      markdown: {
        remarkPlugins: [remarkReadingTime],
        ...
      },
      ...
    });
    ```

  * Step 4: Display Reading Time

    Since our blog posts are stored in a content collection, we access the ``remarkPluginFrontmatter`` from the ``render(entry)`` function. Then, we render ``minutesRead`` in our template wherever we would like it to appear.

    Note that I am using ``[...slug].astro`` instead of just ``[slug].astro`` as the blogs are nested in ``src/content/`` in different subfolders.

    ``src/pages/posts/[...slug].astro``:
    
    ```astro
    ---
    import BasePost from '@/templates/BasePost.astro';
    import { getCollection, getEntryBySlug, render } from 'astro:content';
    
    export async function getStaticPaths() {
      const entries = await getCollection('posts');
    
      return entries.map((entry) => ({
        params: {
          slug: entry.slug, // Must be a string in Astro 5
        },
      }));
    }
    
    // Astro.params.slug is now a string like "tech/python/projects/weather_app"
    const slug = Astro.params.slug;
    
    const entry = await getEntryBySlug('posts', slug);
    if (!entry) {
      console.error(`404: Entry not found for slug: ${slug}`);
      return Astro.redirect('/404');
    }
    
    const { Content, remarkPluginFrontmatter } = await render(entry);
    
    const frontmatter = {
      ...entry.data,
      ...remarkPluginFrontmatter,
    };
    ---
    
    <BasePost content={frontmatter}>
      <Content />
    </BasePost>
    ```

  * Result, after adding it to ``BlogPost.tsx``:

    <img width="485" height="611" alt="reading-time-old" src="https://github.com/user-attachments/assets/5e5f7db2-a30b-4953-8e39-a429435673ec" />
    
</details>

## Progress update 6 - 26/08/25

<details><summary>Move reading time above blog title and italicize</summary>

  * Moved the estimated reading time from next to the publication date to above the blog title, and italicized the text to make it stand out.

    ``src/partials/BlogPost.tsx``:

    ```diff
    ...
    export default function BlogPost(props: BlogPostProps) {
      const { frontmatter, children, readingTimeText } = props;
    
      return (
        <Section key={frontmatter.title}>
          <div>
    +       <div className="text-center text-sm italic text-gray-400">
    +         {readingTimeText}
    +       </div>
            <h1 className="text-center text-3xl font-bold">{frontmatter.title}</h1>
            <div className="text-center text-sm text-gray-400">
              <div className="mt-1">
                Published:{' '}
                {new Date(frontmatter.pubDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
                {frontmatter.updateDate && (
                  <>
                    {' '}
                    · Updated:{' '}
                    {new Date(frontmatter.updateDate).toLocaleDateString(
                      undefined,
                      {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }
                    )}
                  </>
                )}
    -           {' · '}
    -           <span>{readingTimeText}</span>
              </div>
              ...
    ```

  * Old implementation:

    <img width="485" height="611" alt="reading-time-old" src="https://github.com/user-attachments/assets/cee720b1-9e99-460d-8df3-12f09d9a03c3" />

  * New implementation:
 
    <img width="484" height="623" alt="reading-time-new" src="https://github.com/user-attachments/assets/40cc550c-076b-423f-97de-88628646f079" />

</details>

<details><summary>Add horizontal padding to Giscus comments and prev/next footer links</summary>

  * The Giscus comments section and the prev/next footer links at the bottom of blogs did not have any horizontal padding between the sides of the screen.

    <img width="498" height="509" alt="blog-margin-old" src="https://github.com/user-attachments/assets/cdeb3a03-5d45-489f-b2da-679f186eddde" />

  * This was luckily a simple fix, just adding ``px-4 sm:px-0`` to the containers
    * ``px-4``: On mobile (<640px), this adds the horizontal padding.
    * ``sm:px-0``: On larger screens, this makes it go back to no padding since max-w-prose will already centre it nicely.


    ```astro
    <div class="mx-auto mt-5 max-w-prose">
      <!-- Comments section -->
      <div id="comments" class="mt-10 px-4 sm:px-0"> 
        <GiscusComments client:load />
      </div>
    </div>

    {(prev || next) && (
    <div class="mx-auto mt-5 max-w-prose flex justify-between gap-4 border-t border-gray-700 pt-4 text-sm text-gray-400 dark:text-gray-500 px-4 sm:px-0">
      ...
    </div>
    )}
    ```

    <img width="501" height="511" alt="blog-margin-new" src="https://github.com/user-attachments/assets/03e849f8-0716-4e50-a836-cebb99675630" />

  * One thing I noticed, which is quite important: **changes won't appear immediately on the GitHub-hosted website; it may take ~2 minutes for the changes to appear after GitHub Actions completes!**

</details>

## Progress update 7 - 29/08/25

<details><summary>Updated Navbar</summary>

  * The code for the Navbar was completely redone as I wanted it to look completely different from [David Li's blog](https://friendlyuser.github.io/) and essentially exactly like the navbar in [Trung's blog](https://trungtmnguyen.com/).
  * Here is the new code for ``Navbar.tsx``:

    ```tsx
    import { Logo, Section } from 'astro-boilerplate-components';
    
    import MobileNav from '@/partials/MobileNav';
    import SearchButton from '@/partials/SearchButton';
    import ThemeSwitch from '@/partials/ThemeSwitch';
    import { AppConfig } from '@/utils/AppConfig';
    
    const navLinks = [
      { href: '/posts', label: 'Blog' },
      { href: '/tags', label: 'Tags' },
      { href: '/about', label: 'About' },
    ];
    
    const Navbar = () => (
      <div className="sticky top-0 z-50 bg-white py-0 dark:bg-slate-900">
        <Section>
          <div className="flex w-full items-center justify-between">
            {/* Left side - Logo */}
            <a href="/" className="flex items-center space-x-2">
              <Logo
                icon={
                  <svg
                    className="mr-1 size-10 stroke-cyan-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0h24v24H0z" stroke="none"></path>
                    <rect x="3" y="12" width="6" height="8" rx="1"></rect>
                    <rect x="9" y="8" width="6" height="12" rx="1"></rect>
                    <rect x="15" y="4" width="6" height="16" rx="1"></rect>
                    <path d="M4 20h14"></path>
                  </svg>
                }
                name={AppConfig.site_name}
              />
            </a>
    
            {/* Right side */}
            <div className="flex items-center space-x-2 sm:space-x-4 sm:rounded-[40px] sm:border sm:border-gray-200 sm:px-4 sm:py-2 dark:sm:border-gray-700">
              {/* Desktop links (hidden on mobile) */}
              <div className="hidden items-center space-x-6 sm:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-medium text-gray-700 hover:text-cyan-600 dark:text-gray-200 dark:hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
    
              {/* Icons (always visible) */}
              <div className="flex items-center space-x-3">
                <SearchButton />
                <ThemeSwitch />
                {/* Only show hamburger on mobile */}
                <div className="sm:hidden">
                  <MobileNav />
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
    
    export { Navbar };
    ```

    * The Navbar is made sticky by simply adding ``sticky``.

  * The old Navbar:

    <img width="711" height="109" alt="navbar-old" src="https://github.com/user-attachments/assets/ea92f131-9eb0-4ee9-bcb2-ef5753dff624" />

  * The new Navbar:

    <img width="710" height="103" alt="navbar-new" src="https://github.com/user-attachments/assets/65ac94cc-12c9-468f-abd8-8946dd4570cc" />


</details>

<details><summary>Theme switch button</summary>

  * The code for the theme switch button is in ``ThemeSwitch.tsx``:

    ```tsx
    import { useEffect, useState } from 'react';
    
    const ThemeSwitch = () => {
      const [dark, setDark] = useState(false);
    
      useEffect(() => {
        const root = document.documentElement;
        if (
          localStorage.theme === 'dark' ||
          (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
          root.classList.add('dark');
          setDark(true);
        } else {
          root.classList.remove('dark');
          setDark(false);
        }
      }, []);
    
      const toggleTheme = () => {
        const root = document.documentElement;
        if (dark) {
          root.classList.remove('dark');
          localStorage.theme = 'light';
          setDark(false);
        } else {
          root.classList.add('dark');
          localStorage.theme = 'dark';
          setDark(true);
        }
      };
    
      return (
        <button aria-label="Toggle Dark Mode" onClick={toggleTheme}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-6 text-gray-900 dark:text-gray-100"
          >
            {dark ? (
              // Sun icon
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            ) : (
              // Moon icon
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            )}
          </svg>
        </button>
      );
    };
    
    export default ThemeSwitch;
    ```

</details>

<details><summary>Updated MobileNav with Hamburger menu, and Tags/About page</summary>

  * The code that handles the hamburger menu icon and the sliding menu with links to other pages like Tags, About, etc. is in ``MobileNav.tsx``:

    ```tsx
    import { Fragment, useState } from 'react';
    
    const navLinks = [
      { title: 'Home', href: '/', active: true },
      { title: 'Blog', href: '/posts', active: true },
      { title: 'Tags', href: '/tags', active: true }, // placeholder
      { title: 'About', href: '/about', active: true }, // placeholder
      { title: 'Photos', href: '/photos', active: true },
    ];
    
    const MobileNav = () => {
      const [navShow, setNavShow] = useState(false);
    
      const onToggleNav = () => {
        setNavShow((status) => {
          document.body.style.overflow = status ? 'auto' : 'hidden';
          return !status;
        });
      };
    
      return (
        <>
          <button
            aria-label="Toggle Menu"
            onClick={onToggleNav}
            className="sm:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="size-8 text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className={`fixed left-0 top-0 z-10 size-full bg-white opacity-95 duration-300 ease-in-out dark:bg-gray-950 dark:opacity-[0.98]${
              navShow ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-end">
              <button
                className="mr-8 mt-11 size-8"
                aria-label="Toggle Menu"
                onClick={onToggleNav}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="text-gray-900 dark:text-gray-100"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <nav className="fixed mt-8 h-full">
              {navLinks.map((link, index) => (
                <Fragment key={index}>
                  {link.active && (
                    <div className="px-12 py-4">
                      <a
                        href={link.href}
                        className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                        onClick={onToggleNav}
                      >
                        {link.title}
                      </a>
                    </div>
                  )}
                </Fragment>
              ))}
            </nav>
          </div>
        </>
      );
    };
    
    export default MobileNav;
    ```

  * The old MobileNav:

    <img width="498" height="209" alt="mobilenav-old" src="https://github.com/user-attachments/assets/24106d5d-7f31-40f2-acd5-2b55fa1a80df" />

  * The mobile navbar, condensed to 3 icons: search (not implemented yet), theme switch, and the hamburger menu icon.

    <img width="501" height="357" alt="mobilenav-1" src="https://github.com/user-attachments/assets/6fe4fd91-dcbe-4a79-acc8-5d2bf02dece7" />


  * Here is what the screen looks like when clicking on the hamburger menu icon. A menu slides from the right with links to other areas of the website.

    <img width="515" height="415" alt="mobilenav-2" src="https://github.com/user-attachments/assets/c9f3cf96-c4bb-44ed-9c73-93cd76806249" />

  * Adding theme switch means a lot of pain ensuring that all elements look good in both themes. Had to ensure that the sliding menu changed color to match the theme selected, and that the next in the sliding menu switched to the correct contrasting color as well.


</details>

<details><summary>Custom BlogCard/BlogGallery</summary>

  * ``flex flex-col self-start`` added to ``CustomBlogCard.tsx`` to make the blog card fit the contents rather than be a fixed size and include empty space when there is a short description.

    * Without ``flex flex-col self-start``:

      <img width="1024" height="549" alt="blogcard-old" src="https://github.com/user-attachments/assets/99c9815c-5066-4477-8349-a1b28466cfb2" />

    * With ``flex flex-col self-start``:
   
      <img width="1024" height="550" alt="blogcard-new" src="https://github.com/user-attachments/assets/0d2ad30d-262e-4f60-b516-e487716decb8" />

  * Here is the code for ``CustomBlogCard.tsx``:

    ```tsx
    import type { MarkdownInstance } from 'astro';
    import type { IFrontmatter } from 'astro-boilerplate-components';
    
    type IBlogCardProps = {
      instance: MarkdownInstance<IFrontmatter>;
    };
    
    const CustomBlogCard = ({ instance }: IBlogCardProps) => {
      const { title, description, pubDate, imgSrc } = instance.frontmatter;
    
      return (
        <a
          href={instance.url}
          className="flex flex-col self-start overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-transform duration-100 hover:translate-y-2 hover:shadow-lg dark:border-gray-900 dark:bg-slate-800"
        >
          {imgSrc && (
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={imgSrc}
                alt={title}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="mb-1 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <div className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">
              {new Date(pubDate).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <p className="text-center text-sm text-gray-700 dark:text-gray-200">
              {description}
            </p>
          </div>
        </a>
      );
    };
    
    export { CustomBlogCard };
    ```

    * Animation when a card is hovered over is done using ``transition-transform duration-100 hover:translate-y-2``.
    * Notice how the code that handles the image/thumbnail is not inside the ``<div className="p-4">``, this is what enables the edge-to-edge thumbnail image, rather than the image also being inside the blog card padding.
    * The title, date, and description are added to the blog card, all encapsulated in the ``<div className="p-4">``, ensuring there is padding between it and the edge of the blog card.
    * The color of the text is switched depending on the theme selected, e.g. for the title: ``text-gray-900 dark:text-gray-100``.
    * The image is cropped to a 4:3 aspect ratio using ``relative aspect-[4/3]``.
    * The blog card has curved edges using ``rounded-lg``.
    * The default shadow of the blog card and the darker shadow when hovered over are added using: ``shadow-md hover:shadow-lg``.
    * In the future, I may add the reading time to the blog card.

  * Here is the code for ``CustomBlogGallery.tsx``:

    ```tsx
    import type { MarkdownInstance } from 'astro';
    import type { IFrontmatter } from 'astro-boilerplate-components';
    
    import { CustomBlogCard } from './CustomBlogCard';
    
    type IRecentPostsProps = {
      postList: MarkdownInstance<IFrontmatter>[];
    };
    
    const CustomBlogGallery = ({ postList }: IRecentPostsProps) => (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {postList.map((post) => (
          <CustomBlogCard key={post.url} instance={post} />
        ))}
      </div>
    );
    
    export { CustomBlogGallery };
    ```
    
</details>

## Progress update 8 - 30/11/25

<details><summary>Add thumbnail to link when shared online</summary>

* Currently when sharing links to the blog on social media like X, Discord, WhatsApp, etc., it just displays the title, description, and URL.

  ![IMG_2970](https://github.com/user-attachments/assets/41cd145b-b1e8-450b-b9cd-33fa274917b1)

* To add the blog image as a thumbnail, I just had to add OG & Twitter meta tags to ``Base.astro`` and ``BasePost.astro``, and ensure all images are stored in ``/public/imgs/...`` (and not accessed from external websites), and the image address must start with a ``/``.

  Frontmatter:

  ```diff
  - imgSrc: 'https://images.unsplash.com/photo-1606482512676-255bf02be7cf?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  + imgSrc: '/imgs/2025/nov/numbers.jpg'
  ```
  
  ``Base.astro``:
  
  ```diff
   head: {
      title: string;
      description: string;
  +   ogTitle?: string;
  +   ogDescription?: string;
  +   ogImage?: string;
  +   ogUrl?: string;
  +   twitterCard?: string;
  +   twitterImage?: string;
    };
  }
  ```
  
  ```diff
  const {
  - head: { title, description },
  + head: {
  +   title,
  +   description,
  +   ogTitle,
  +   ogDescription,
  +   ogImage,
  +   ogUrl,
  +   twitterCard,
  +   twitterImage
  + },
  } = Astro.props as Props;
  ```
  
  ```diff
  <html lang="en">
    <head>
      <!-- Theme preload script -->
      <script is:inline>
        ...
      </script>
  
      <ViewTransitions />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={AppConfig.author} />
  
  +   <!-- Open Graph / Social Sharing -->
  +   {ogTitle && <meta property="og:title" content={ogTitle} />}
  +   {ogDescription && (
  +     <meta property="og:description" content={ogDescription} />
  +   )}
  +   {ogImage && <meta property="og:image" content={ogImage} />}
  +   {ogUrl && <meta property="og:url" content={ogUrl} />}
  +   <meta property="og:type" content="article" />
  
  +   <!-- Twitter Cards -->
  +   {twitterCard && <meta name="twitter:card" content={twitterCard} />}
  +   {twitterImage && <meta name="twitter:image" content={twitterImage} />}
  
      ...
  ```
  
  ``BasePost.astro``:
  
  ```diff
  - <Base head={{ title, description: content.description }}>
  	
  + <Base
  +   head={{
  +     title,
  +     description: content.description,
  +     ogTitle: content.title,
  +     ogDescription: content.description,
  +     ogImage: Astro.site + content.imgSrc,
  +     ogUrl: Astro.url,
  +     twitterCard: "summary_large_image",
  +     twitterImage: Astro.site + content.imgSrc,
  +   }}
  + >
  ```

* The result:

  ![IMG_2971](https://github.com/user-attachments/assets/80039c68-daf8-40a2-9b41-0eecb5a3f88d)

</details>
