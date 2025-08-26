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

<details><summary>Estimated reading time</summary>

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

  * I was stuck trying to implement this feature for a month; it worked in localhost but didn't seem to work in the actual (Github-hosted) website, although now I think the issue was likely that I just didn't wait long enough for the changes to display... **Some changes don't appear immediately and may take ~2 minutes!**
    
</details>

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

    <img width="552" height="917" alt="progress-bar" src="https://github.com/user-attachments/assets/8a94032d-c420-4811-8503-28da501aa9aa" />

</details>

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



